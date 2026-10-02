// ==================================================================
// Class 9 — CBSE / NCERT Chemistry
// Chapter 1: Matter in Our Surroundings
// Chapter 2: Is Matter Around Us Pure
// Chapter 3: Atoms and Molecules
// Chapter 4: Structure of the Atom
//
// Chapter numbers follow the rationalised NCERT Class 9 Science
// textbook (chemistry units). Chemical formulae use Unicode
// sub/superscripts so they render correctly without a special parser.
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
  color: "crimson" | "magenta" | "copper" | "viridian";
  readingTime: string;
  videos: Video[];
  notes: string; // markdown-lite
  experiments: Experiment[];
  objectiveQuestions: ObjectiveQuestion[];
  subjectiveQuestions: SubjectiveQuestion[];
}

export const chapters: Chapter[] = [
  // ================================================================
  // CHAPTER 1 — MATTER IN OUR SURROUNDINGS
  // ================================================================
  {
    id: "matter-in-our-surroundings",
    number: 1,
    title: "Matter in Our Surroundings",
    subtitle: "Everything around you, made of tiny, ever-moving particles",
    description:
      "What matter is made of, the characteristics of its particles, the three states of matter and interconversion between them, evaporation and factors affecting it.",
    icon: "🌡️",
    color: "crimson",
    readingTime: "22 min read",
    videos: [
      {
        title: "Matter in Our Surroundings — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/B55_UADPl40",
      },
      {
        title: "States of Matter — Animated One Shot",
        channel: "One-shot (Animated)",
        url: "https://www.youtube.com/embed/zHe-DJNBVHw",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/gQ-X9wV8TXQ",
      },
    ],
    notes: `
# Matter in Our Surroundings

## What Is Matter?

Anything that has **mass** and **occupies space** (has volume) is called **matter**. Everything around us — the air we breathe, the water we drink, the food we eat, our own bodies — is made of matter.

## Matter Is Made of Particles

Early Indian and Greek philosophers classified matter into five basic elements — the "Panch Tatva" — air, earth, fire, sky and water. Modern science instead tells us that matter is made up of very small particles, and this can be shown by simple activities.

> [!key] When potassium permanganate crystals are dissolved in water, the colour spreads throughout even though only a tiny amount was used — this shows that matter is made of extremely small particles that themselves get divided into smaller and smaller particles as they dissolve, and there is enough space between water particles to accommodate them.

**Characteristics of particles of matter:**
1. Particles of matter have **space between them** — the amount of space differs from one form of matter to another.
2. Particles of matter are **continuously moving** (they possess kinetic energy); as temperature increases, particle motion (kinetic energy) also increases — this is called the **kinetic theory of matter**.
3. Particles of matter **attract each other** — the strength of this force of attraction differs from one form of matter to another.

## States of Matter

Matter around us exists in three main physical states: **solid**, **liquid** and **gas**, mainly due to differences in the two competing factors — the space between particles (and thus force of attraction) and the particles' kinetic energy.

| Property | Solid | Liquid | Gas |
|---|---|---|---|
| Shape | Definite | No definite shape, takes shape of container | No definite shape |
| Volume | Definite | Definite | No definite volume |
| Compressibility | Negligible | Very little | Highly compressible |
| Particle spacing | Very closely packed | Relatively less closely packed | Far apart |
| Force of attraction | Very strong | Intermediate | Negligible |
| Density | Generally highest | Intermediate | Generally lowest |
| Diffusion | Extremely slow | Faster than solids | Very fast |

::diagram:states-of-matter

**Rigidity and fluidity:** solids are rigid and have a definite shape because of the strong forces of attraction between closely packed particles, so they possess a tendency to maintain their shape when subjected to outside force. Liquids and gases can flow and change shape — they are called **fluids**.

## Can Matter Change Its State?

Matter can change from one state to another by **changing temperature** or **pressure**.

### Effect of Change of Temperature
- On **heating** a solid, the kinetic energy of particles increases; at a certain temperature (the **melting point**), the solid melts into a liquid. The amount of heat energy required to change 1 kg of a solid into liquid at atmospheric pressure at its melting point is called the **latent heat of fusion**.
- The process of melting (change of solid state into liquid state) is also called **fusion**.
- On further heating, the liquid changes into a gas at its **boiling point**. The amount of heat energy required to change 1 kg of a liquid into gas at atmospheric pressure at its boiling point is called the **latent heat of vaporisation**.

> [!note] Latent heat is 'hidden' because, during a change of state, the temperature of the substance remains constant even though heat is continuously supplied — this heat energy is used to overcome the forces of attraction between particles, not to raise the temperature.

- **Sublimation** — some solids (like camphor, naphthalene balls, ammonium chloride, iodine, solid CO₂/dry ice) change directly from the solid to the gaseous state on heating, without passing through the liquid state, and the reverse change (gas to solid) is also called sublimation (or deposition).
- **Condensation** — the change of gas into liquid on cooling.
- **Freezing/solidification** — the change of liquid into solid on cooling.

::diagram:interconversion-of-states

### Effect of Change of Pressure
Applying pressure and reducing temperature can liquefy gases — for example, solid carbon dioxide (dry ice) is stored under high pressure, and turns directly into gas when the pressure is reduced to 1 atmosphere, without becoming liquid — this is why it is called dry ice.

## Evaporation

**Evaporation** is the surface phenomenon by which particles of a liquid gain enough energy to escape from the liquid's surface and change into the vapour state at any temperature below the boiling point (unlike boiling, which is a bulk phenomenon occurring throughout the liquid, at a fixed temperature).

### Factors Affecting the Rate of Evaporation
1. **Surface area** — increasing surface area increases the rate of evaporation (more particles at the surface can escape).
2. **Temperature** — increasing temperature increases the rate of evaporation (more particles gain enough kinetic energy to escape).
3. **Humidity** — the amount of water vapour present in air; a decrease in humidity increases the rate of evaporation (the air can hold more additional vapour).
4. **Wind speed** — an increase in wind speed increases the rate of evaporation, since it moves away the water vapour molecules surrounding the liquid, allowing more evaporation to occur.

> [!key] **Evaporation causes cooling.** During evaporation, the particles absorb energy from the surroundings (or the liquid itself) to regain the energy lost by the escaping particles, which is why the surroundings feel cool. This is why we feel cold when we come out of water, why sweating cools our body, and why water kept in earthen pots (matkas) stays cool — water constantly seeps through the pores and evaporates, taking heat from the water inside.
    `,
    experiments: [
      {
        id: "diffusion-potassium-permanganate",
        title: "Demonstrating That Matter Is Made of Particles",
        activityRef: "NCERT Activity 1.1",
        aim: "To show that matter is made up of very small particles by dissolving potassium permanganate in water.",
        materials: ["Potassium permanganate crystals", "A beaker of water", "A glass rod"],
        procedure: [
          "Take about 2-3 crystals of potassium permanganate in a beaker containing 100 mL of water and stir.",
          "Take out approximately 10 mL of this solution and put it into another 90 mL of clear water.",
          "Repeat this process of dilution 5-8 times with fresh water each time.",
        ],
        observation:
          "Every time the solution is diluted further, the water still turns visibly pink/purple, even after many rounds of dilution.",
        conclusion:
          "Since even a few crystals of potassium permanganate colour such a large volume of water through repeated dilutions, the crystals must be breaking up into extremely small, invisible particles that spread and occupy the space between water particles — direct evidence that matter is made of very small (indeed, minute) particles.",
        visual: {
          before: "hsl(280 30% 92%)",
          after: "hsl(300 55% 55%)",
          labels: { before: "Crystals added to water", after: "Colour spreads even after many dilutions" },
        },
      },
      {
        id: "diffusion-gas-particles",
        title: "Diffusion of a Gas — Particles Are Constantly Moving",
        activityRef: "NCERT Activity 1.2",
        aim: "To show that gas particles move continuously and can diffuse to mix completely with another gas.",
        materials: ["A source of a gas with a strong smell (e.g. an air freshener, or a dish of perfume/agarbatti)", "An open room"],
        procedure: [
          "Light an incense stick (agarbatti) or spray a small amount of perfume/air freshener in one corner of a room.",
          "Stand at the other end of the room and note how long it takes for the smell to reach you.",
        ],
        observation: "The characteristic smell spreads throughout the room within a short time, even though no one is physically carrying the scent particles across.",
        conclusion:
          "Gas particles possess kinetic energy and move randomly and continuously in all directions at high speed; this constant movement allows the scent particles to mix completely with the particles of air already in the room (diffusion), reaching every part of the room and confirming that gas particles are always in motion.",
        visual: {
          before: "hsl(30 20% 95%)",
          after: "hsl(30 15% 92%)",
          gas: "Fragrance",
          labels: { before: "Scent released at one corner", after: "Spreads throughout the room" },
        },
      },
      {
        id: "latent-heat-melting-ice",
        title: "Observing Latent Heat During the Melting of Ice",
        activityRef: "NCERT Activity 1.5",
        aim: "To show that temperature remains constant while a solid is changing into a liquid, despite continuous heating.",
        materials: ["Crushed ice in a beaker", "A thermometer", "A burner", "A stopwatch"],
        procedure: [
          "Take crushed ice in a beaker and note its initial temperature.",
          "Heat the beaker gently and record the temperature at regular time intervals as the ice melts, continuing after it has fully melted into water.",
          "Plot a graph of temperature (y-axis) against time (x-axis).",
        ],
        observation:
          "The temperature rises from below 0 °C up to 0 °C, then remains constant at 0 °C for a period while the ice is visibly melting into water, and only starts rising again once all the ice has melted.",
        conclusion:
          "The flat portion of the graph at 0 °C shows that the heat supplied during melting is being used entirely to overcome the forces of attraction between the particles of ice (converting it to liquid water), rather than to raise the temperature — this hidden heat energy is called the latent heat of fusion.",
        visual: {
          before: "hsl(200 40% 90%)",
          after: "hsl(200 50% 85%)",
          thermal: "endothermic",
          labels: { before: "Ice below 0 °C, heating begins", after: "Temperature holds at 0 °C while melting" },
        },
      },
      {
        id: "sublimation-ammonium-chloride",
        title: "Sublimation of Ammonium Chloride",
        activityRef: "NCERT Activity 1.7",
        aim: "To observe the direct change of a solid into vapour (sublimation), without passing through the liquid state.",
        materials: ["Ammonium chloride (or camphor/naphthalene)", "A china dish", "An inverted glass funnel", "A cotton plug", "A burner"],
        procedure: [
          "Take a small amount of ammonium chloride in a china dish and cover it with an inverted glass funnel (plugged loosely with cotton at the stem).",
          "Heat the china dish gently.",
          "Observe the inner wall of the funnel.",
        ],
        observation: "White fumes rise from the heated solid and deposit as a fresh white solid layer on the cooler inner walls of the funnel, without any liquid ever being observed at any stage.",
        conclusion:
          "Ammonium chloride changes directly from the solid state to the vapour (gaseous) state on heating, and directly back from vapour to solid on cooling on the funnel's walls, without passing through an intermediate liquid state — this direct solid-to-gas (and gas-to-solid) change is called sublimation.",
        visual: {
          before: "hsl(0 0% 95%)",
          after: "hsl(0 0% 97%)",
          gas: "Ammonium chloride vapour",
          labels: { before: "White solid, heating begins", after: "White solid deposits on funnel — no liquid seen" },
        },
      },
      {
        id: "evaporation-cooling-effect",
        title: "Evaporation Causes Cooling",
        activityRef: "NCERT Activity 1.9",
        aim: "To show that evaporation of a liquid causes cooling of the surroundings.",
        materials: ["A small amount of acetone/ether/perfume (or, more safely, just water)", "A cotton swab", "A thermometer or just the back of a hand"],
        procedure: [
          "Wrap a piece of cotton wool soaked in acetone (or water) around the bulb of a thermometer.",
          "Note the initial temperature reading, then leave the thermometer exposed to air.",
          "Note the temperature again after a couple of minutes, as the liquid evaporates from the cotton.",
        ],
        observation: "The temperature reading on the thermometer drops noticeably as the liquid on the cotton evaporates.",
        conclusion:
          "During evaporation, particles of the liquid at the surface absorb energy from their immediate surroundings (here, the thermometer bulb and the surrounding air) in order to gain enough kinetic energy to escape into the vapour state; this loss of heat energy from the surroundings causes a noticeable drop in temperature, demonstrating why evaporation produces a cooling effect.",
        visual: {
          before: "hsl(200 15% 92%)",
          after: "hsl(200 25% 85%)",
          thermal: "endothermic",
          labels: { before: "Liquid-soaked cotton, initial reading", after: "Temperature drops as liquid evaporates" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "Anything that has mass and occupies space is called:",
        options: ["Energy", "Matter", "Force", "A compound"],
        correctAnswer: 1,
        explanation: "Matter is defined as anything that has mass and occupies space (has volume).",
      },
      {
        question: "Which of the following correctly describes the particles of a gas compared to a solid?",
        options: [
          "Gas particles are more closely packed than solid particles",
          "Gas particles are far apart and move much faster than solid particles",
          "Gas particles do not move at all",
          "Gas and solid particles are identical in spacing",
        ],
        correctAnswer: 1,
        explanation: "Gas particles have large spaces between them and move rapidly and randomly, unlike the closely packed, less mobile particles of a solid.",
      },
      {
        question: "The change of a solid directly into vapour, without passing through the liquid state, is called:",
        options: ["Evaporation", "Condensation", "Sublimation", "Freezing"],
        correctAnswer: 2,
        explanation: "Sublimation is the direct change of a solid to a gas (and back), skipping the liquid state, as seen in substances like ammonium chloride, camphor and dry ice.",
      },
      {
        question: "The temperature at which a liquid starts changing into a gas at atmospheric pressure is called its:",
        options: ["Melting point", "Freezing point", "Boiling point", "Latent point"],
        correctAnswer: 2,
        explanation: "The boiling point is the fixed temperature at which a liquid changes into its gaseous state at atmospheric pressure.",
      },
      {
        question: "Why does the temperature remain constant while ice is melting, even though heat is continuously supplied?",
        options: [
          "No heat is actually being absorbed",
          "The heat supplied is used to overcome the forces of attraction between particles (latent heat)",
          "The thermometer is faulty",
          "Ice does not absorb heat at all",
        ],
        correctAnswer: 1,
        explanation: "The heat supplied during a change of state is used entirely as latent heat, to overcome intermolecular forces of attraction, not to raise the temperature.",
      },
      {
        question: "Which factor does NOT increase the rate of evaporation?",
        options: ["Increase in temperature", "Increase in surface area", "Increase in humidity", "Increase in wind speed"],
        correctAnswer: 2,
        explanation: "An increase in humidity (more water vapour already in the air) decreases the rate of evaporation, since the air has less capacity to absorb more vapour.",
      },
      {
        question: "We feel cool after coming out of a swimming pool because:",
        options: [
          "The water is always freezing cold",
          "Water on our skin evaporates, absorbing heat from our body and cooling it",
          "Air pressure decreases suddenly",
          "Our body temperature rises",
        ],
        correctAnswer: 1,
        explanation: "As water evaporates from wet skin, it absorbs heat energy from the body to do so, producing a cooling sensation.",
      },
      {
        question: "Solid carbon dioxide is called 'dry ice' because:",
        options: [
          "It never melts",
          "It changes directly into gas on releasing pressure, without forming a liquid",
          "It is not actually made of CO₂",
          "It is completely dry to the touch always",
        ],
        correctAnswer: 1,
        explanation: "Solid CO₂ is stored under high pressure; when the pressure is reduced to atmospheric pressure, it sublimes directly into gas without becoming a liquid, hence 'dry' ice.",
      },
      {
        question: "The states of matter that are together classified as 'fluids' are:",
        options: ["Solids and liquids", "Liquids and gases", "Solids and gases", "Only gases"],
        correctAnswer: 1,
        explanation: "Liquids and gases can both flow and take the shape of their container, so they are together called fluids, unlike rigid solids.",
      },
      {
        question: "Evaporation differs from boiling mainly because evaporation:",
        options: [
          "Occurs only at the boiling point",
          "Is a surface phenomenon that occurs at any temperature below the boiling point",
          "Only happens in solids",
          "Requires no energy at all",
        ],
        correctAnswer: 1,
        explanation: "Evaporation is a surface phenomenon that occurs continuously at any temperature, whereas boiling is a bulk phenomenon that occurs throughout the liquid only at its fixed boiling point.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define matter.",
        answer: "Matter is anything that has mass and occupies space (has volume).",
      },
      {
        marks: 1,
        question: "Name the process by which a liquid changes into a solid on cooling.",
        answer: "Freezing (or solidification).",
      },
      {
        marks: 2,
        question: "List two characteristics of the particles of matter.",
        answer:
          "1. Particles of matter have spaces between them, and this spacing differs between solids, liquids and gases.\n2. Particles of matter are continuously moving (they possess kinetic energy), and this kinetic energy increases with temperature.",
      },
      {
        marks: 2,
        question: "Why do we see water droplets forming on the outside of a glass containing ice-cold water?",
        answer:
          "The water vapour present in the air near the cold glass loses energy (heat) to the cold surface and condenses (changes from gas to liquid), forming visible water droplets on the outside of the glass.",
      },
      {
        marks: 2,
        question: "Define latent heat of vaporisation.",
        answer:
          "The latent heat of vaporisation is the amount of heat energy required to convert 1 kg of a liquid into gas, at atmospheric pressure, at its boiling point, without any change in temperature.",
      },
      {
        marks: 3,
        question: "List and explain three factors that affect the rate of evaporation of a liquid.",
        answer:
          "1. **Surface area** — a larger surface area exposes more particles to the surface, allowing more of them to escape, increasing the rate of evaporation.\n2. **Temperature** — a higher temperature gives particles more kinetic energy, so more of them can escape as vapour, increasing the rate.\n3. **Wind speed** — increased wind speed carries away the vapour particles that accumulate just above the liquid surface, allowing more evaporation to occur (since the air near the surface doesn't get saturated with vapour).",
      },
      {
        marks: 3,
        question: "Distinguish between the three states of matter (solid, liquid, gas) in terms of shape, volume and compressibility.",
        answer:
          "A **solid** has a definite shape and definite volume, and is negligibly compressible, due to the very closely packed particles held by strong forces of attraction. A **liquid** has no definite shape (it takes the shape of its container) but has a definite volume, and is only slightly compressible. A **gas** has neither a definite shape nor a definite volume (it expands to fill its container), and is highly compressible, since its particles are far apart with negligible forces of attraction between them.",
      },
      {
        marks: 3,
        question: "Why does a desert cooler work less efficiently on a humid day?",
        answer:
          "A desert cooler works by evaporating water to cool the surrounding air. On a humid day, the air already contains a large amount of water vapour, which reduces its capacity to absorb any more moisture. Since the rate of evaporation depends on humidity (lower humidity gives a higher rate of evaporation), the cooler's water evaporates much more slowly on a humid day, making it far less effective at cooling.",
      },
      {
        marks: 5,
        question:
          "(a) Explain, using the kinetic theory of matter, why solids are rigid but gases can be compressed easily. (b) Describe what happens (in terms of particles) when a solid is heated to become a liquid, and then further heated to become a gas.",
        answer:
          "(a) In a solid, particles are packed very closely together and held in fixed positions by very strong forces of attraction, leaving almost no space between them; this rigid, tightly-held arrangement resists any change in shape or volume, making solids rigid and virtually incompressible. In a gas, particles are far apart, moving randomly at high speed, with negligible forces of attraction between them; since there is a large amount of empty space between the particles, this space can be reduced considerably by applying pressure, making gases highly compressible.\n(b) When a solid is heated, its particles gain kinetic energy and vibrate more vigorously about their fixed positions; at the melting point, they gain enough energy to overcome the strong forces of attraction holding them in a fixed arrangement, and the solid changes into a liquid, where particles can now move past one another (though still relatively close together). On further heating, the liquid's particles gain even more kinetic energy; at the boiling point, they gain enough energy to completely overcome the remaining (much weaker) forces of attraction between them, and escape as a gas, where particles move independently, far apart, and at high speed.",
      },
      {
        marks: 5,
        question:
          "(a) What is sublimation? Name two substances that undergo sublimation. (b) Describe an activity to demonstrate the sublimation of ammonium chloride.",
        answer:
          "(a) Sublimation is the direct change of a substance from the solid state to the gaseous state on heating (or from gaseous to solid on cooling), without passing through the intermediate liquid state. Examples: ammonium chloride, camphor, naphthalene, iodine and dry ice (solid CO₂) all undergo sublimation.\n(b) A small amount of ammonium chloride is placed in a china dish and covered with an inverted glass funnel (with its stem loosely plugged with cotton wool, to let air/pressure escape). On gently heating the china dish, white fumes rise directly from the solid ammonium chloride; these fumes then deposit back as a fresh layer of white solid on the cooler inner walls of the funnel. Since no liquid is observed forming or being collected at any point during this heating and cooling, this confirms that ammonium chloride changes directly between the solid and gaseous states — i.e., it sublimes.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 2 — IS MATTER AROUND US PURE
  // ================================================================
  {
    id: "is-matter-around-us-pure",
    number: 2,
    title: "Is Matter Around Us Pure",
    subtitle: "Mixtures, pure substances, and the separation techniques that tell them apart",
    description:
      "Pure substances versus mixtures, homogeneous and heterogeneous mixtures, solutions and their properties, colloids and suspensions, methods of separating mixtures, and physical versus chemical changes.",
    icon: "🧪",
    color: "magenta",
    readingTime: "24 min read",
    videos: [
      {
        title: "Is Matter Around Us Pure — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/zv1-ZuLSskQ",
      },
      {
        title: "Separation Techniques — Animated One Shot",
        channel: "One-shot (Animated)",
        url: "https://www.youtube.com/embed/X6HHtlepDlo",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/qKl4mieovu0",
      },
    ],
    notes: `
# Is Matter Around Us Pure

## What Is a Pure Substance?

In chemistry, a **pure substance** consists of a single type of particle — that is, all constituent particles have the same chemical nature. A pure substance cannot be separated into other kinds of matter by physical methods.

## Mixtures

A **mixture** contains more than one type of pure substance (elements and/or compounds), mixed together in any proportion (not fixed), without any new substance being formed; the components of a mixture retain their individual properties and can be separated by physical methods.

### Types of Mixtures
- **Homogeneous mixture** — has a completely uniform composition throughout; there is no visible boundary of separation between the different constituents, and the components cannot be seen as distinct even under a microscope, e.g. salt solution, sugar solution, alloys like brass.
- **Heterogeneous mixture** — has a non-uniform composition; distinct boundaries of separation between the constituents can be observed, and the different components remain visible, e.g. a mixture of salt and sulphur, oil and water, mixture of sodium chloride and iron filings.

## Solutions

A **solution** is a homogeneous mixture of two or more substances, made up of a **solute** (the substance dissolved, present in a smaller amount) and a **solvent** (the substance in which the solute is dissolved, present in a larger amount).

### Properties of a Solution
1. A solution is a **homogeneous mixture**.
2. The particles of a solution are smaller than 1 nanometre (10⁻⁹ m) in diameter, so they cannot be seen with the naked eye.
3. Because of the small particle size, a beam of light passing through a true solution is **not scattered**, and so the path of light is not visible (does not show the Tyndall effect).
4. The solute particles do not settle down when the solution is left undisturbed — that is, a solution is stable.
5. The components of a solution cannot be separated from the mixture by the simple physical method of filtration.

### Concentration of a Solution
- A solution in which no more solute can be dissolved at a given temperature is called a **saturated solution**. If more solute can still be dissolved at that temperature, it is called an **unsaturated solution**.
- **Concentration** = (mass of solute) / (mass of solution) × 100 (mass by mass percentage), or (mass of solute) / (volume of solution) × 100 (mass by volume percentage).

### Suspensions
A **suspension** is a heterogeneous mixture in which small particles of a solid are spread throughout a liquid without dissolving.
- Particles of a suspension are large enough (more than 1000 nm, i.e. 10⁻⁶ m or more) to be seen with the naked eye.
- Particles of a suspension can **scatter a beam of light** passing through it, making its path visible (this is the **Tyndall effect**).
- The solute particles **settle down** (are not stable) when the suspension is left undisturbed, and can be separated from the mixture by the process of filtration.

### Colloidal Solutions
A **colloid** is a heterogeneous mixture in which the size of the particles of the substance is too small to be seen with the naked eye, but is big enough to scatter a beam of light passing through it, and to show the **Tyndall effect**.
- Particle size in a colloid is intermediate — between that of a true solution and a suspension (roughly 1 nm to 1000 nm).
- Colloidal particles do not settle down when the mixture is left undisturbed (unlike a suspension), because the particle-solvent interaction is strong enough to counteract gravity.
- Colloids cannot be separated from the mixture by the simple process of filtration, but can be separated by the special technique of **centrifugation**.
- Common examples: milk, ink, blood, shaving cream, smoke, fog.

::diagram:tyndall-effect

## Physical and Chemical Changes

A **physical change** is a change in which no new substance is formed, and the change in physical properties is temporary and usually reversible, e.g. melting of ice, dissolving sugar in water, evaporation of water. A **chemical change** is a change in which one or more new substances with different properties are formed, and the change is usually permanent and not easily reversible, e.g. burning of paper, rusting of iron, digestion of food. Mixtures are usually the result of physical changes, since the process of mixing does not necessarily form a new substance.

## Separation of Mixtures

Since the substances that constitute a mixture retain their individual properties, they can generally be separated by using physical methods that exploit differences in properties like particle size, solubility, density and boiling point.

| Method | Used to separate |
|---|---|
| Evaporation | A solid dissolved in a liquid (obtaining the solid) |
| Centrifugation | Very fine, insoluble particles that don't settle by simple filtration (e.g. cream from milk) |
| Separating funnel | Two immiscible liquids (e.g. oil and water) |
| Sublimation | A sublimable solid (e.g. ammonium chloride) from a non-sublimable one |
| Chromatography | Two or more dissolved solids that are similar in properties (e.g. dyes in ink) |
| Distillation | Two miscible liquids that have sufficiently different boiling points |
| Fractional distillation | Two (or more) miscible liquids whose boiling points are close to each other |
| Crystallisation | A pure solid substance from an impure sample |

::diagram:separating-funnel

**Crystallisation** is superior to the simple technique of evaporation for separating a pure solid dissolved in a liquid mixture, because: (i) some substances decompose or, in the case of sugar, may get charred on strong heating during evaporation, (ii) evaporation to complete dryness cannot remove soluble impurities present in small quantities, and (iii) some solids get trapped in impurities if the solution is over-evaporated too fast.

## Elements and Compounds

**Elements** are the simplest form of pure substances, made up of only one type of particle (atoms of only one kind, or, in a few cases like sulphur, molecules made only of that one kind of atom); they cannot be broken down into simpler substances by ordinary chemical reactions.
- **Metals**: lustrous, malleable, ductile, good conductors, e.g. gold, silver, copper, iron.
- **Non-metals**: generally show properties opposite to metals (dull, brittle, poor conductors, except graphite), e.g. hydrogen, oxygen, sulphur, carbon.
- **Metalloids**: show properties intermediate between metals and non-metals, e.g. boron, silicon.

A **compound** is a substance made up of two or more elements, chemically combined together in a fixed proportion by mass; the properties of a compound are entirely different from those of its constituent elements.

> [!key] A key distinction: a **mixture** shows the properties of its constituent substances and can be separated into them by physical methods, and its composition is variable. A **compound** has entirely new properties, unlike its constituent elements, and can be broken down into those elements only by chemical methods, in a fixed proportion by mass.
    `,
    experiments: [
      {
        id: "tyndall-effect-demo",
        title: "Demonstrating the Tyndall Effect",
        activityRef: "NCERT Activity 2.6",
        aim: "To observe the Tyndall effect in a colloidal solution, and show that it is not observed in a true solution.",
        materials: ["A beam of light (e.g. a laser pointer or a strong torch)", "A true solution (e.g. salt solution)", "A colloidal solution (e.g. a small amount of milk in water, or starch solution)", "Two beakers/glasses (one darkened room)"],
        procedure: [
          "In a darkened room, pass a beam of light through a beaker of salt solution from the side, and observe from a right angle whether the path of light is visible.",
          "Repeat with a beaker containing the colloidal (milk or starch) solution.",
        ],
        observation: "The path of light is not visible through the salt solution. The path of light is clearly visible as a bright, scattered beam through the colloidal solution.",
        conclusion:
          "The particles in a true solution (like dissolved salt) are too small to scatter light, so the beam passes through without becoming visible. The larger particles in a colloid (like milk) are big enough to scatter the light passing through them in all directions, making the path of the light beam visible — this scattering of light by colloidal particles is called the Tyndall effect, and is a key property distinguishing colloids from true solutions.",
        visual: {
          before: "hsl(45 20% 96%)",
          after: "hsl(45 15% 92%)",
          labels: { before: "Light through salt solution — path invisible", after: "Light through milk — path clearly visible" },
        },
      },
      {
        id: "separating-funnel-oil-water",
        title: "Separating Oil and Water Using a Separating Funnel",
        aim: "To separate a mixture of two immiscible liquids (oil and water) using a separating funnel.",
        materials: ["A mixture of oil and water", "A separating funnel with a stopcock", "A stand and clamp", "Two beakers"],
        procedure: [
          "Pour the oil-water mixture into a separating funnel clamped on a stand, and allow it to stand undisturbed for a few minutes.",
          "Observe the two distinct layers that form.",
          "Slowly open the stopcock to drain off the denser (lower) liquid layer into a beaker, then close the stopcock just before the interface reaches it, and collect the upper layer in a separate beaker.",
        ],
        observation: "The mixture settles into two clear, distinct layers — a denser water layer at the bottom and a less dense oil layer floating on top; each layer can be drained off separately.",
        conclusion:
          "Since oil and water are immiscible (they do not mix to form a homogeneous solution) and have different densities, they naturally separate into distinct layers when left undisturbed; a separating funnel allows the denser lower layer to be drained off precisely through its stopcock, cleanly separating the two liquids — this technique is also used industrially, for instance in the extraction of iron in the blast furnace, to separate slag from molten iron.",
        visual: {
          before: "hsl(45 55% 65%)",
          after: "hsl(200 45% 65%)",
          labels: { before: "Oil-water mixture, settling", after: "Two distinct layers separated" },
        },
      },
      {
        id: "chromatography-ink-separation",
        title: "Separating the Dyes in Black Ink by Chromatography",
        activityRef: "NCERT Activity 2.9",
        aim: "To separate the different coloured components (dyes) present in black ink using paper chromatography.",
        materials: ["A strip of chromatography/filter paper", "Black ink (water-soluble)", "A beaker with a small amount of water", "A pencil", "A watch glass/cover for the beaker"],
        procedure: [
          "Draw a light pencil line near the bottom of the filter paper strip and place a small spot of black ink on this line.",
          "Suspend the strip in a beaker containing a shallow layer of water (below the ink spot), ensuring the ink spot itself is not submerged.",
          "Cover the beaker and allow the water to rise up the paper by capillary action; remove the strip once the water front is near the top.",
        ],
        observation: "As the water rises up the paper, the single black spot separates into several distinct bands of different colours (e.g. blue, red, yellow), each rising to a different height on the strip.",
        conclusion:
          "Black ink is actually a mixture of several different coloured dyes. Since each dye has a different solubility in water and a different degree of attraction to the paper (stationary phase) versus the moving water (mobile phase), each dye travels a different distance up the paper in the same time, causing them to separate into distinct, visible bands — this technique, chromatography, is especially useful for separating substances that are dissolved in the same solvent and are too similar to separate by simpler methods.",
        visual: {
          before: "hsl(0 0% 15%)",
          after: "hsl(0 0% 15%)",
          labels: { before: "Single black ink spot", after: "Separated into distinct colour bands" },
        },
      },
      {
        id: "fractional-distillation-miscible-liquids",
        title: "Separating a Mixture of Miscible Liquids by Fractional Distillation",
        aim: "To separate a mixture of two miscible liquids with close boiling points (e.g. acetone and water) using fractional distillation.",
        materials: ["A mixture of two miscible liquids with close boiling points", "A fractional distillation flask with a fractionating column", "A thermometer", "A condenser", "A receiving flask", "A heat source"],
        procedure: [
          "Set up a fractional distillation apparatus, with a fractionating column packed with glass beads placed between the flask and the condenser, and a thermometer at the top of the column.",
          "Heat the mixture gently and observe the thermometer reading as vapour rises through the column.",
          "Collect the distillate (the liquid with the lower boiling point) as it condenses, and note when the thermometer reading changes, indicating the second liquid is beginning to distil over.",
        ],
        observation: "The thermometer reading stabilises near the boiling point of the more volatile liquid as it distils over first and is collected; after this liquid is exhausted, the thermometer reading rises again towards the boiling point of the second, less volatile liquid.",
        conclusion:
          "The fractionating column provides a large surface area on which rising vapour repeatedly condenses and re-vaporises; since the more volatile liquid (lower boiling point) vaporises more readily at each stage, it effectively 'climbs' the column and reaches the top (and the condenser) first, allowing an efficient separation of two miscible liquids whose boiling points are too close together to be cleanly separated by simple distillation alone.",
        visual: {
          before: "hsl(200 30% 90%)",
          after: "hsl(200 15% 96%)",
          gas: "Vapour",
          labels: { before: "Heating the miscible mixture", after: "First liquid distils over cleanly" },
        },
      },
      {
        id: "crystallisation-copper-sulphate",
        title: "Purifying Copper Sulphate by Crystallisation",
        activityRef: "NCERT Activity 2.10",
        aim: "To obtain pure crystals of copper sulphate from an impure sample, using the technique of crystallisation.",
        materials: ["Impure copper sulphate sample", "Water", "A beaker", "A funnel and filter paper", "A china dish", "A burner"],
        procedure: [
          "Dissolve the impure copper sulphate in the minimum amount of water needed, heating gently to help it dissolve completely, to form a saturated solution.",
          "Filter the hot solution while it is still hot, to remove any insoluble impurities, collecting the filtrate in a china dish.",
          "Allow the filtrate to cool slowly and undisturbed; observe the crystals that form, then carefully decant off the remaining liquid (mother liquor).",
        ],
        observation: "As the hot, saturated solution cools slowly, well-formed, pure blue crystals of copper sulphate separate out, leaving behind the soluble impurities dissolved in the remaining liquid.",
        conclusion:
          "Crystallisation is a technique for purifying a solid, based on the fact that the solubility of most solids increases with temperature. By dissolving the impure solid in the minimum amount of hot solvent (forming a nearly saturated solution) and then cooling it slowly, the pure substance (present in the much larger amount) crystallises out in a well-formed, purer state, while soluble impurities (present in much smaller amounts) remain dissolved in the mother liquor — this method is preferred over simple evaporation, since it avoids decomposition and gives purer, better-formed crystals.",
        visual: {
          before: "hsl(210 55% 55%)",
          after: "hsl(210 55% 55%)",
          labels: { before: "Hot, saturated CuSO₄ solution", after: "Pure blue crystals form on cooling" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "A pure substance, in the chemical sense, is one that:",
        options: [
          "Is always a mixture of two or more elements",
          "Consists of only a single kind of particle throughout",
          "Cannot be a compound",
          "Must always be a metal",
        ],
        correctAnswer: 1,
        explanation: "A pure substance consists of only one kind of particle (all having the same chemical composition), and cannot be separated into other substances by physical methods.",
      },
      {
        question: "Which of the following is a homogeneous mixture?",
        options: ["Sand and water", "Oil and water", "A salt solution", "Iron filings and sulphur powder"],
        correctAnswer: 2,
        explanation: "A salt solution is uniform throughout with no visible boundary between its components, making it a homogeneous mixture, unlike the others, which are heterogeneous.",
      },
      {
        question: "The scattering of a beam of light by particles in a colloidal solution is called:",
        options: ["Brownian motion", "The Tyndall effect", "Diffusion", "Sublimation"],
        correctAnswer: 1,
        explanation: "The Tyndall effect is the scattering of light by the larger particles present in a colloid, making the path of the light beam visible; this does not occur in a true solution.",
      },
      {
        question: "Which of the following techniques is used to separate cream from milk?",
        options: ["Distillation", "Chromatography", "Centrifugation", "Sublimation"],
        correctAnswer: 2,
        explanation: "Centrifugation is used to separate very fine, colloidal particles (like cream from milk) that would not settle by simple filtration.",
      },
      {
        question: "Fractional distillation is used specifically to separate:",
        options: [
          "Two immiscible liquids",
          "Two miscible liquids with boiling points close to each other",
          "A solid dissolved in a liquid",
          "Two solids of similar particle size",
        ],
        correctAnswer: 1,
        explanation: "Fractional distillation, using a fractionating column, is used to separate two or more miscible liquids whose boiling points are close together.",
      },
      {
        question: "A compound differs from a mixture in that a compound:",
        options: [
          "Has a variable composition",
          "Can be separated into its constituents by simple physical methods",
          "Has constituents combined in a fixed proportion by mass, with entirely new properties",
          "Always shows the properties of its constituent elements",
        ],
        correctAnswer: 2,
        explanation: "Unlike a mixture, a compound's elements are combined chemically in a fixed proportion by mass, and the compound has entirely new properties different from its constituent elements.",
      },
      {
        question: "Crystallisation is generally preferred over simple evaporation to obtain a pure solid because:",
        options: [
          "It is always faster",
          "It avoids decomposition/charring of the substance and removes small amounts of soluble impurities better",
          "It requires no heating at all",
          "It only works for liquids, not solids",
        ],
        correctAnswer: 1,
        explanation: "Crystallisation avoids problems like decomposition or charring (which can happen on complete evaporation) and gives purer, better-formed crystals than simple evaporation.",
      },
      {
        question: "Which particle size range is characteristic of a true solution?",
        options: ["Less than 1 nm", "Between 1 nm and 1000 nm", "More than 1000 nm", "There is no defined range"],
        correctAnswer: 0,
        explanation: "True solution particles are smaller than 1 nanometre (10⁻⁹ m) in diameter, which is why they cannot be seen and do not scatter light.",
      },
      {
        question: "Milk is an example of a:",
        options: ["True solution", "Suspension", "Colloid", "Pure compound"],
        correctAnswer: 2,
        explanation: "Milk is a classic example of a colloid — its particles are large enough to scatter light (Tyndall effect) but too small to settle out or be seen with the naked eye.",
      },
      {
        question: "Which of the following is an example of a chemical change?",
        options: ["Melting of wax", "Dissolving salt in water", "Rusting of iron", "Boiling of water"],
        correctAnswer: 2,
        explanation: "Rusting of iron forms a new substance (iron oxide) with different properties, making it a chemical change; the other examples are all physical changes.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define a solution.",
        answer: "A solution is a homogeneous mixture of two or more substances, consisting of a solute dissolved in a solvent.",
      },
      {
        marks: 1,
        question: "Name the technique used to separate two immiscible liquids.",
        answer: "Using a separating funnel.",
      },
      {
        marks: 2,
        question: "Distinguish between a saturated and an unsaturated solution.",
        answer:
          "A **saturated solution** is one in which no more solute can be dissolved at a given temperature (the solution has reached its maximum solute-holding capacity at that temperature). An **unsaturated solution** is one in which more solute can still be dissolved at that same temperature.",
      },
      {
        marks: 2,
        question: "Why does a beam of light become visible when passed through a colloid, but not through a true solution?",
        answer:
          "The particles in a colloid are large enough (between about 1 nm and 1000 nm) to scatter light passing through them in various directions, making the beam's path visible — the Tyndall effect. Particles in a true solution are much smaller (less than 1 nm) and cannot scatter light in this way, so the beam's path remains invisible.",
      },
      {
        marks: 2,
        question: "Give two differences between a mixture and a compound.",
        answer:
          "1. A **mixture** has a variable composition and its components can be present in any proportion; a **compound** has a fixed composition, with its constituent elements combined in a definite proportion by mass.\n2. The components of a **mixture** retain their individual properties and can be separated by physical methods; a **compound** has entirely new properties different from its constituent elements, and can only be broken down into them by chemical methods.",
      },
      {
        marks: 3,
        question: "Describe how you would separate the components of a mixture containing sand, salt, and water.",
        answer:
          "First, the mixture is filtered to separate the insoluble sand (retained on the filter paper) from the salt solution (which passes through as the filtrate). The clear salt solution (filtrate) is then heated to evaporate the water, leaving behind solid salt crystals. This way, sand is separated by filtration, and salt is separated from water by evaporation (or, for purer crystals, by crystallisation).",
      },
      {
        marks: 3,
        question: "Explain the difference between a suspension and a colloid, giving one property that distinguishes each from a true solution.",
        answer:
          "A **suspension** is a heterogeneous mixture with relatively large particles (more than 1000 nm) that settle down on standing and can be separated by filtration; it scatters light strongly and can appear cloudy/opaque. A **colloid** has smaller particles (between about 1 nm and 1000 nm) that do NOT settle down on standing (unlike a suspension) and cannot be separated by ordinary filtration, but, like a suspension, it does scatter light (shows the Tyndall effect). A true solution, in contrast to both, has particles too small to scatter light at all, and does not settle out or require special separation from a simple mixing process.",
      },
      {
        marks: 3,
        question: "Why is a solution of sugar in water considered a physical change and not a chemical change?",
        answer:
          "When sugar dissolves in water, no new substance is formed — the sugar particles simply spread out and mix uniformly with the water particles at a molecular level, but each substance retains its own chemical identity and properties. This process is also easily reversible (the sugar can be recovered unchanged by evaporating the water), which is characteristic of a physical change, unlike a chemical change, where a new substance with different properties is formed and the change is generally not easily reversed.",
      },
      {
        marks: 5,
        question:
          "(a) What is chromatography? Describe, with the help of an activity, how it can be used to separate the dyes present in black ink. (b) Name one other application of chromatography.",
        answer:
          "(a) Chromatography is a technique used to separate the individual components of a mixture that are dissolved in the same solvent and are too similar to separate by simpler physical methods, based on differences in how strongly each component is attracted to a stationary phase (like paper) versus a moving solvent (the mobile phase). To separate the dyes in black ink: a spot of ink is placed near the bottom of a strip of filter paper (above a pencil line), and the strip is dipped into a shallow layer of water in a beaker (with the ink spot kept above the water level). As the water rises up the paper by capillary action, it carries the different dyes in the ink along with it, but since each dye has a different solubility and a different degree of attraction to the paper, each one travels at a different rate — separating the original single spot into several distinct, differently-coloured bands as the water rises.\n(b) Chromatography is also used to separate colouring matter from natural pigments, to detect adulterants or dyes in food, and to separate the constituents of blood or urine samples in medical/forensic testing.",
      },
      {
        marks: 5,
        question:
          "(a) Explain the terms element, compound and mixture with one example of each. (b) Classify the following as elements, compounds or mixtures: sodium, salt (sodium chloride), soil, sugar, distilled water, air.",
        answer:
          "(a) An **element** is the simplest form of a pure substance, made of only one type of particle, e.g. iron (Fe). A **compound** is a pure substance made of two or more elements chemically combined in a fixed ratio, with entirely new properties, e.g. water (H₂O), formed from hydrogen and oxygen. A **mixture** contains two or more elements and/or compounds mixed together in any proportion, without forming a new substance, and can be separated by physical methods, e.g. air (a mixture of nitrogen, oxygen, carbon dioxide and other gases).\n(b) **Sodium** — element. **Salt (sodium chloride)** — compound. **Soil** — mixture (heterogeneous, containing various minerals, organic matter, etc.). **Sugar** — compound. **Distilled water** — compound (pure H₂O, with impurities removed). **Air** — mixture (homogeneous, primarily nitrogen and oxygen gases along with other components).",
      },
    ],
  },

  // ================================================================
  // CHAPTER 3 — ATOMS AND MOLECULES
  // ================================================================
  {
    id: "atoms-and-molecules",
    number: 3,
    title: "Atoms and Molecules",
    subtitle: "The laws behind every balanced equation, and the arithmetic of atomic mass",
    description:
      "The laws of chemical combination, Dalton's atomic theory, atoms and molecules of elements and compounds, writing chemical formulae, atomic and molecular mass, and the mole concept.",
    icon: "⚛️",
    color: "copper",
    readingTime: "26 min read",
    videos: [
      {
        title: "Atoms and Molecules — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/9NXjeVchtqQ",
      },
      {
        title: "Mole Concept for Class 9 — Animated",
        channel: "One-shot (Animated)",
        url: "https://www.youtube.com/embed/AVvyfWn2sOI",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/8x0nlwFzXHE",
      },
    ],
    notes: `
# Atoms and Molecules

## Laws of Chemical Combination

### Law of Conservation of Mass
Proposed by Antoine Lavoisier, this law states that **mass can neither be created nor destroyed in a chemical reaction** — the total mass of the reactants is equal to the total mass of the products.

### Law of Constant (Definite) Proportions
Proposed by Joseph Proust, this law states that **in a chemical substance, the elements are always present in a definite proportion by mass**, irrespective of the source of the sample or the method of its preparation.

> [!example] In pure water taken from any source, the ratio of the mass of hydrogen to the mass of oxygen is always 1 : 8.

## Dalton's Atomic Theory

John Dalton proposed an atomic theory, based on the above two laws, with the following main postulates:
1. All matter is made of very tiny, indivisible particles called **atoms**.
2. Atoms cannot be created or destroyed in a chemical reaction.
3. All the atoms of a given element are identical in mass and chemical properties, but atoms of different elements have different masses and chemical properties.
4. Atoms combine in the ratio of small whole numbers to form compounds.
5. The relative number and kinds of atoms are constant in a given compound.

## What Is an Atom?

An **atom** is the smallest particle of an element that can take part in a chemical reaction, and may or may not be capable of independent existence. Atoms are extremely small — so small that they cannot be seen even with the most powerful optical microscopes; their sizes are measured in **nanometres** (1 nm = 10⁻⁹ m).

### Symbols of Atoms
Each element is given a chemical **symbol** — an internationally accepted, short-hand representation, usually the first letter (capitalised) or the first two letters (first capitalised, second lower case) of its name, e.g. H for hydrogen, O for oxygen, Ca for calcium, Na for sodium (from the Latin 'natrium'), Fe for iron (from the Latin 'ferrum').

## Atomic Mass

Since atoms are so small that individual atoms cannot be weighed directly, atomic masses are expressed in a relative unit called the **atomic mass unit (u)**, defined as exactly 1/12th the mass of one atom of the carbon-12 isotope. On this scale, the atomic mass of hydrogen is roughly 1 u, oxygen is 16 u, and carbon is 12 u.

## Atomicity and Molecules

A **molecule** is the smallest particle of an element or a compound that is capable of independent existence, and shows all the properties of that substance. The number of atoms constituting a molecule is known as its **atomicity**.

### Molecules of Elements
Atoms of the same element combine together in specific, small whole numbers to form molecules of that element.
- **Monatomic:** made of a single atom, e.g. noble gases (He, Ne, Ar).
- **Diatomic:** made of two atoms, e.g. H₂, O₂, N₂, Cl₂.
- **Polyatomic:** made of more than two atoms, e.g. P₄ (phosphorus), S₈ (sulphur), O₃ (ozone).

### Molecules of Compounds
Atoms of different elements combine together in a fixed and definite ratio to form molecules of a compound, e.g. water (H₂O) is a combination of hydrogen and oxygen in the ratio 2:1; ammonia (NH₃) is a combination of nitrogen and hydrogen in the ratio 1:3.

## Ions

An **ion** is a charged species — an atom or a group of atoms carrying a positive or negative charge.
- A **cation** is a positively charged ion, formed by the loss of one or more electrons, e.g. Na⁺, Ca²⁺.
- An **anion** is a negatively charged ion, formed by the gain of one or more electrons, e.g. Cl⁻, O²⁻.
- A **polyatomic ion** is a group of atoms that together carry a net charge, and behaves as a single unit in a chemical reaction, e.g. hydroxide (OH⁻), sulphate (SO₄²⁻), nitrate (NO₃⁻), carbonate (CO₃²⁻), ammonium (NH₄⁺).

## Writing Chemical Formulae

The **valency** of an element is a measure of its combining capacity, defined as the number of hydrogen atoms that one atom of the given element can combine with (or displace).

**Rules for writing a formula:**
1. Write down the symbols of the constituent elements/radicals, with the more electropositive element/radical written first.
2. Write the valency of each element/radical below its symbol.
3. Cross over the valencies (the valency of one element becomes the subscript of the other), and simplify the ratio if possible.

> [!example] For magnesium chloride: Mg has a valency of 2, Cl has a valency of 1. Crossing over the valencies gives MgCl₂.

**Molecular formula** shows the actual number of atoms of each element present in one molecule of a substance, e.g. the molecular formula of glucose is C₆H₁₂O₆.

## Molecular Mass and Mole Concept

The **molecular mass** of a substance is the sum of the atomic masses of all the atoms present in one molecule of that substance, e.g. the molecular mass of water (H₂O) = 2(1) + 16 = 18 u.

**Formula unit mass** is used for ionic compounds (which do not exist as discrete molecules), and is calculated the same way, e.g. the formula unit mass of NaCl = 23 + 35.5 = 58.5 u.

### The Mole Concept
Since atoms and molecules are present in extremely large numbers even in a small amount of a substance, chemists use a special counting unit called the **mole** to express such large numbers conveniently. One **mole** of any species (atoms, molecules, ions or particles) is that quantity, in number, having a mass equal to its atomic/molecular mass in grams, and it contains a fixed number of particles, given by the **Avogadro constant**, Nₐ = 6.022 × 10²³.

Number of moles = Given mass ÷ Molar mass = Number of particles ÷ Nₐ
    `,
    experiments: [
      {
        id: "law-of-conservation-of-mass",
        title: "Verifying the Law of Conservation of Mass",
        activityRef: "NCERT Activity 3.1",
        aim: "To verify that mass is neither created nor destroyed in a chemical reaction.",
        materials: ["Sodium sulphate solution and barium chloride solution (in separate small vials)", "A conical flask with a tight-fitting cork/stopper", "A sensitive weighing balance"],
        procedure: [
          "Take one solution in a small vial and the other in a separate small vial; place both vials, without mixing, carefully inside a larger conical flask, and stopper it tightly.",
          "Weigh the entire stoppered flask (with both unmixed solutions inside) on a sensitive balance and record the mass.",
          "Tilt or shake the flask to allow the two solutions to mix and react without opening the stopper, then weigh the flask again.",
        ],
        observation: "A white precipitate forms as soon as the two solutions are mixed, but the total mass of the sealed flask before and after the reaction remains exactly the same.",
        reaction: "Na₂SO₄(aq) + BaCl₂(aq) → BaSO₄(s)↓ + 2NaCl(aq)",
        conclusion:
          "Since the system was completely sealed and no matter could enter or escape during the reaction, the unchanged total mass confirms the Law of Conservation of Mass — the total mass of reactants equals the total mass of products in a chemical reaction.",
        visual: {
          before: "hsl(40 20% 96%)",
          after: "hsl(40 20% 96%)",
          precipitate: { name: "Barium sulphate", colour: "hsl(0 0% 96%)" },
          labels: { before: "Sealed flask, solutions unmixed", after: "Mixed — same total mass" },
        },
      },
      {
        id: "atomic-model-building",
        title: "Building Models of Simple Molecules to Understand Atomicity",
        aim: "To construct simple models of diatomic, triatomic and polyatomic molecules to visualise atomicity.",
        materials: ["Coloured balls or clay (to represent different atoms)", "Sticks/toothpicks (to represent bonds)", "A reference chart of molecular formulae"],
        procedure: [
          "Build a model of a diatomic molecule (e.g. O₂), using two identical balls connected by a stick.",
          "Build a model of a triatomic molecule (e.g. H₂O), using one central ball connected to two smaller identical balls.",
          "Build a model of a polyatomic molecule (e.g. NH₃ or P₄) with the appropriate number of atoms.",
        ],
        observation: "Each model requires a different number of 'atom' balls, matching exactly the number given by the molecular formula of that substance (2 for O₂, 3 for H₂O, and so on).",
        conclusion:
          "The atomicity of a molecule (the number of atoms that combine to form it) can be directly read off from its molecular formula, and physically building these models helps visualise how atoms of the same element (as in O₂) or different elements (as in H₂O) combine in fixed, definite numbers to form a molecule.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Assembling atom models", after: "Diatomic, triatomic, polyatomic molecules built" },
        },
      },
      {
        id: "valency-crossover-formula-writing",
        title: "Practising the Crossover Method for Writing Chemical Formulae",
        aim: "To practise writing correct chemical formulae for ionic compounds using the crossover (valency) method.",
        materials: ["A valency chart of common elements and radicals", "Paper and pencil"],
        procedure: [
          "Write the symbol of the cation (with its valency as a superscript) and the symbol of the anion/radical (with its valency as a superscript) side by side, e.g. Al³⁺ and SO₄²⁻.",
          "Cross over the numerical valency of each ion to become the subscript of the other ion.",
          "Simplify the resulting subscripts to the smallest whole-number ratio, if a common factor exists.",
        ],
        observation: "For aluminium and sulphate: crossing over gives Al₂(SO₄)₃ — the valency 3 of Al becomes the subscript of the sulphate group (in a bracket, since it's a polyatomic ion), and the valency 2 of sulphate becomes the subscript of Al.",
        conclusion:
          "The crossover method reliably produces the correct formula for an ionic compound because it ensures the total positive charge contributed by the cations exactly balances the total negative charge contributed by the anions, keeping the overall compound electrically neutral — practising this method with several different valency combinations builds fluency in writing and predicting chemical formulae.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Al³⁺ and SO₄²⁻ written side by side", after: "Al₂(SO₄)₃ — valencies crossed over" },
        },
      },
      {
        id: "molar-mass-calculation-practice",
        title: "Calculating Molar Mass and Number of Moles",
        aim: "To practise calculating the molar mass of a compound and relate a given mass to the number of moles present.",
        materials: ["A periodic table/atomic mass chart", "A weighing balance (for a real sample, e.g. table salt)", "Paper and pencil"],
        procedure: [
          "Weigh out a known mass of a common compound, such as table salt (NaCl), e.g. 11.7 g.",
          "Calculate the molar mass of NaCl using atomic masses (Na = 23 u, Cl = 35.5 u): molar mass = 23 + 35.5 = 58.5 g/mol.",
          "Calculate the number of moles present in the weighed sample using: number of moles = given mass ÷ molar mass.",
        ],
        observation: "For 11.7 g of NaCl: number of moles = 11.7 g ÷ 58.5 g/mol = 0.2 mol.",
        conclusion:
          "By first calculating the molar mass of a compound from the atomic masses of its constituent elements, and then dividing the actual mass of a sample by this molar mass, we can directly determine the number of moles (and hence the number of formula units/molecules, using the Avogadro constant) present in any given sample — a calculation used constantly throughout chemistry.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Weighing 11.7 g of NaCl", after: "Calculated as 0.2 mol" },
        },
      },
      {
        id: "law-of-constant-proportions-water",
        title: "Illustrating the Law of Constant Proportions Using Water",
        aim: "To show, using known mass data, that water always contains hydrogen and oxygen in the same fixed proportion by mass, regardless of source.",
        materials: ["Reference data on the electrolysis of water (mass/volume of H₂ and O₂ produced)", "Paper and pencil"],
        procedure: [
          "Refer to (or reproduce, using a simple electrolysis of water setup) data showing the volumes of hydrogen and oxygen gas collected during electrolysis of water.",
          "Convert the collected volumes to masses using the known densities of hydrogen and oxygen gas.",
          "Calculate the ratio of the mass of hydrogen to the mass of oxygen obtained.",
        ],
        observation: "Regardless of the exact amount of water electrolysed, or the specific water sample used (tap water, distilled water, rainwater, after purification), the mass ratio of hydrogen to oxygen obtained is consistently found to be very close to 1 : 8.",
        conclusion:
          "Since the mass ratio of hydrogen to oxygen in water is always found to be the same (1 : 8), regardless of the source or method of obtaining the water sample, this confirms the Law of Constant (Definite) Proportions — that a chemical compound always contains its constituent elements in a fixed, definite proportion by mass.",
        visual: {
          before: "hsl(200 15% 95%)",
          after: "hsl(200 15% 95%)",
          gas: "Hydrogen and oxygen",
          labels: { before: "Electrolysing water", after: "H:O mass ratio always 1:8" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "The Law of Conservation of Mass states that:",
        options: [
          "Mass can be created but not destroyed",
          "Mass can neither be created nor destroyed in a chemical reaction",
          "Mass always increases in a chemical reaction",
          "Mass is irrelevant to chemical reactions",
        ],
        correctAnswer: 1,
        explanation: "The Law of Conservation of Mass, given by Lavoisier, states that the total mass of reactants equals the total mass of products in a chemical reaction.",
      },
      {
        question: "According to the Law of Constant Proportions, the ratio of hydrogen to oxygen by mass in water is always:",
        options: ["1:1", "2:1", "1:8", "8:1"],
        correctAnswer: 2,
        explanation: "Water always contains hydrogen and oxygen combined in the fixed mass ratio of 1:8, regardless of the source of the water.",
      },
      {
        question: "According to Dalton's atomic theory, atoms of the same element are:",
        options: [
          "Different in mass and properties",
          "Identical in mass and chemical properties",
          "Always radioactive",
          "Never able to combine with other atoms",
        ],
        correctAnswer: 1,
        explanation: "One of Dalton's key postulates is that all atoms of a given element are identical in mass and chemical properties, while atoms of different elements differ.",
      },
      {
        question: "One atomic mass unit (u) is defined as:",
        options: [
          "The mass of one hydrogen atom",
          "1/12th of the mass of one atom of carbon-12",
          "The mass of one mole of atoms",
          "1/16th of the mass of one oxygen atom",
        ],
        correctAnswer: 1,
        explanation: "By international agreement, 1 atomic mass unit (u) is exactly 1/12th the mass of one atom of the carbon-12 isotope.",
      },
      {
        question: "A molecule made up of only two atoms is called:",
        options: ["Monatomic", "Diatomic", "Triatomic", "Polyatomic"],
        correctAnswer: 1,
        explanation: "A diatomic molecule is composed of exactly two atoms, e.g. O₂, N₂, H₂.",
      },
      {
        question: "An ion formed by the loss of one or more electrons is called a:",
        options: ["Anion", "Cation", "Neutral atom", "Isotope"],
        correctAnswer: 1,
        explanation: "A cation is a positively charged ion, formed when an atom loses one or more electrons.",
      },
      {
        question: "The formula of aluminium oxide (Al with valency 3, oxide ion with valency 2) is:",
        options: ["AlO", "Al₂O₃", "Al₃O₂", "AlO₃"],
        correctAnswer: 1,
        explanation: "Crossing over the valencies of Al (3) and O (2) gives Al₂O₃, the correctly balanced formula for aluminium oxide.",
      },
      {
        question: "The molecular mass of water (H₂O) is:",
        options: ["16 u", "17 u", "18 u", "20 u"],
        correctAnswer: 2,
        explanation: "Molecular mass of H₂O = 2(1) + 16 = 18 u, using atomic masses H = 1 u and O = 16 u.",
      },
      {
        question: "One mole of any substance contains how many elementary particles?",
        options: ["6.022 × 10²²", "6.022 × 10²³", "1.66 × 10⁻²⁴", "3.011 × 10²³"],
        correctAnswer: 1,
        explanation: "One mole of any substance contains 6.022 × 10²³ particles — this number is the Avogadro constant.",
      },
      {
        question: "Which of these is a polyatomic ion?",
        options: ["Na⁺", "Cl⁻", "SO₄²⁻ (sulphate)", "Ca²⁺"],
        correctAnswer: 2,
        explanation: "Sulphate (SO₄²⁻) is a polyatomic ion — a group of atoms that together carry a net charge and behave as a single unit; the others are simple, single-atom (monatomic) ions.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Define an atom.",
        answer: "An atom is the smallest particle of an element that can take part in a chemical reaction, and may or may not exist independently.",
      },
      {
        marks: 1,
        question: "What is the atomicity of ozone (O₃)?",
        answer: "3 — ozone is a triatomic (polyatomic) molecule, made of three oxygen atoms.",
      },
      {
        marks: 2,
        question: "State the Law of Conservation of Mass and give one everyday chemical reaction that illustrates it.",
        answer:
          "The Law of Conservation of Mass states that mass can neither be created nor destroyed during a chemical reaction — the total mass of the reactants equals the total mass of the products. Example: when a candle burns completely, the total mass of the wax consumed plus the oxygen used from the air equals the total mass of the carbon dioxide and water vapour produced.",
      },
      {
        marks: 2,
        question: "What is the difference between an atom and a molecule?",
        answer:
          "An **atom** is the smallest particle of an element that can take part in a chemical reaction; it may or may not be able to exist independently (e.g. a single sodium atom cannot exist freely, but a single argon atom can). A **molecule** is the smallest particle of an element or a compound that IS capable of independent existence, and is formed when two or more atoms combine together.",
      },
      {
        marks: 2,
        question: "Write the chemical formulae of: (a) calcium chloride (Ca valency 2, Cl valency 1), (b) sodium carbonate (Na valency 1, carbonate CO₃ valency 2).",
        answer: "(a) CaCl₂. (b) Na₂CO₃.",
      },
      {
        marks: 3,
        question: "State the main postulates of Dalton's atomic theory (any three).",
        answer:
          "1. All matter is made of extremely tiny, indivisible particles called atoms.\n2. Atoms can neither be created nor destroyed in a chemical reaction.\n3. Atoms of a given element are all identical in mass and chemical properties, while atoms of different elements have different masses and properties.\n(Also acceptable: atoms combine in small whole-number ratios to form compounds; the relative number and kinds of atoms are constant in a given compound.)",
      },
      {
        marks: 3,
        question: "Explain the mole concept, and calculate the number of moles present in 5.8 g of sodium chloride (molar mass 58.5 g/mol).",
        answer:
          "The mole is a counting unit in chemistry, defined so that one mole of any substance contains a fixed number of particles (Avogadro's number, 6.022 × 10²³) and has a mass, in grams, numerically equal to its atomic/molecular/formula mass.\nNumber of moles = given mass ÷ molar mass = 5.8 g ÷ 58.5 g/mol ≈ **0.099 mol** (approximately 0.1 mol).",
      },
      {
        marks: 3,
        question: "Explain the rules used to write the correct chemical formula of an ionic compound, using calcium phosphate as an example (Ca valency 2, phosphate PO₄ valency 3).",
        answer:
          "To write a correct chemical formula: (i) write the symbols of the two ions side by side, with the cation first; (ii) write the valency (numerical charge) of each ion; (iii) cross over these valencies so that each one becomes the numerical subscript of the other ion, enclosing any polyatomic ion in brackets if it needs a subscript greater than 1; (iv) simplify the resulting ratio to the smallest whole numbers if a common factor exists.\nFor calcium (valency 2) and phosphate (valency 3): crossing over gives Ca₃(PO₄)₂ — since 2 and 3 share no common factor, this is already in its simplest form.",
      },
      {
        marks: 5,
        question:
          "(a) State the Law of Constant Proportions, and explain how it supports Dalton's atomic theory. (b) Give one numerical example illustrating this law.",
        answer:
          "(a) The Law of Constant Proportions states that in a chemical compound, the elements are always present in a definite (fixed) proportion by mass, regardless of the source of the sample or the method used to prepare it. This law directly supports Dalton's atomic theory, since it can be explained if we assume that a compound is formed when a fixed, small whole-number ratio of atoms of each constituent element combine together — since the atoms of a given element all have the same fixed mass (per Dalton's theory), combining them in a fixed atomic ratio automatically produces a fixed mass ratio in the resulting compound, exactly as observed.\n(b) Example: carbon dioxide (CO₂) always contains carbon and oxygen in the mass ratio 12:32, i.e. 3:8, whether the CO₂ sample is obtained by burning carbon in air, by the action of an acid on a carbonate, or by respiration — the mass ratio of its constituent elements remains the same in every sample, regardless of its source or method of preparation.",
      },
      {
        marks: 5,
        question:
          "(a) What is a polyatomic ion? Give three examples with their formulae and charges. (b) Write the chemical formula for ammonium sulphate, given ammonium (NH₄) has a valency of 1 and sulphate (SO₄) has a valency of 2.",
        answer:
          "(a) A polyatomic ion is a group of atoms that are chemically bonded together and carry a net electrical charge, behaving as a single unit (like a single ion) in chemical reactions and formula-writing. Examples: hydroxide, OH⁻ (charge −1); sulphate, SO₄²⁻ (charge −2); ammonium, NH₄⁺ (charge +1).\n(b) Crossing over the valencies of ammonium (1) and sulphate (2): the sulphate ion's valency (2) becomes the subscript for ammonium, and ammonium's valency (1) becomes the subscript for sulphate (needing brackets, since more than one ammonium ion is needed): **(NH₄)₂SO₄**.",
      },
    ],
  },

  // ================================================================
  // CHAPTER 4 — STRUCTURE OF THE ATOM
  // ================================================================
  {
    id: "structure-of-the-atom",
    number: 4,
    title: "Structure of the Atom",
    subtitle: "Electrons, protons and neutrons — and how they're arranged inside every atom",
    description:
      "The discovery of sub-atomic particles, Thomson's and Rutherford's atomic models, Bohr's model of the atom, distribution of electrons in shells, valence electrons, atomic number and mass number, and isotopes and isobars.",
    icon: "🔬",
    color: "viridian",
    readingTime: "23 min read",
    videos: [
      {
        title: "Structure of the Atom — Full Chapter One Shot",
        channel: "NCERT-based revision",
        url: "https://www.youtube.com/embed/2xt06e8jV6c",
      },
      {
        title: "Atomic Models Explained — Animated",
        channel: "One-shot (Animated)",
        url: "https://www.youtube.com/embed/QT2t-nzYT0M",
      },
      {
        title: "Complete Chapter (NCERT Covered)",
        channel: "Prashant Kirad · Exphub",
        url: "https://www.youtube.com/embed/f3wjZBW5-6Y",
      },
    ],
    notes: `
# Structure of the Atom

## Charged Particles in Matter

Late 19th-century experiments (studying the passage of electricity through gases, and the phenomenon of static electricity) showed that atoms are not indivisible, as Dalton had proposed, but are themselves made up of smaller, charged sub-atomic particles.

## Discovery of Sub-Atomic Particles

### The Electron
J. J. Thomson discovered the **electron**, a negatively charged particle, through his studies of cathode rays in a discharge tube. Electrons are a fundamental, universal constituent of all atoms, and carry a unit negative charge with a very small mass (about 1/2000th the mass of a hydrogen atom).

### The Proton
E. Goldstein discovered the presence of new radiation, called canal rays, which led to the discovery of the **proton** — a positively charged particle, carrying a unit positive charge, with a mass approximately equal to that of a hydrogen atom (about 2000 times heavier than an electron).

### The Neutron
J. Chadwick later discovered a third fundamental particle, the **neutron**, which has no charge (it is electrically neutral) and has a mass slightly greater than that of a proton. Neutrons are present in the nucleus of all atoms, except the ordinary hydrogen atom.

## Thomson's Model of the Atom

J. J. Thomson proposed that an atom consists of a positively charged sphere, with electrons embedded in it, much like the seeds in a watermelon (or plums in a pudding — hence sometimes called the "plum pudding model"). The positive and negative charges are equal in magnitude, so the atom as a whole is electrically neutral.

## Rutherford's Model of the Atom

Ernest Rutherford conducted a famous experiment: he directed fast-moving **alpha (α) particles** at a thin sheet of gold foil.

**Observations:**
1. Most of the fast-moving alpha particles passed straight through the gold foil.
2. Some of the alpha particles were deflected by the foil by small angles.
3. A very few alpha particles (about 1 in 12000) bounced back at almost 180°.

**Conclusions drawn by Rutherford:**
1. Most of the space inside an atom is empty, because most alpha particles passed through the gold foil without any deflection.
2. Very few particles were deflected from their path, indicating that the positive charge of the atom occupies very little space.
3. A very small fraction of alpha particles were deflected by 180°, indicating that all the positive charge and mass of the atom were concentrated in a very small volume within the atom.

Based on these observations, Rutherford proposed a model of the atom, which had the following features: (i) there is a positively charged centre in an atom called the **nucleus** — nearly all the mass of an atom resides in this nucleus; (ii) electrons revolve around the nucleus in well-defined orbits; (iii) the size of the nucleus is very small as compared to the size of the atom.

**Drawback of Rutherford's model:** an electron revolving around the nucleus in a circular path is continuously accelerating, and according to the theory of electromagnetism, such an accelerating, charged particle would continuously radiate energy and spiral into the nucleus. This would make the atom highly unstable — but atoms are known to be stable, so Rutherford's model could not fully explain the stability of the atom.

## Bohr's Model of the Atom

Niels Bohr proposed an improved model, based on the following postulates:
1. Only certain special orbits, known as **discrete orbits** (or shells), are permitted inside an atom.
2. While revolving in these discrete orbits, the electrons do not radiate energy.

These orbits/shells are represented by the letters K, L, M, N, ... or the numbers n = 1, 2, 3, 4, ..., counting outward from the nucleus.

::diagram:bohr-model

## Distribution of Electrons in Different Shells (Orbits)

The distribution of electrons into different shells was suggested by Bohr and Bury, and follows these rules:
1. The maximum number of electrons that can be accommodated in a given shell is given by the formula **2n²**, where n is the shell number (K = 1, L = 2, M = 3, N = 4, ...). So the K shell can hold a maximum of 2 electrons, the L shell 8, the M shell 18, and so on.
2. The maximum number of electrons that can be accommodated in the outermost shell is **8** (this is regardless of the value of 2n² for that shell).
3. Electrons are not accommodated in a given shell unless the inner shells are filled first — that is, shells are filled in a step-wise manner.

> [!example] For chlorine (atomic number 17): the K shell gets 2 electrons, the L shell gets 8 electrons, and the remaining 7 electrons go into the M shell — giving the electronic configuration **2, 8, 7**.

## Valency

The electrons present in the outermost shell of an atom are known as the **valence electrons**. The combining capacity of an atom, known as its **valency**, can be determined directly from its number of valence electrons:
- If the number of valence electrons in the outermost shell is close to 8, the atom tends to **gain** electrons (making the valency = 8 − number of valence electrons).
- If the number of valence electrons is small (1, 2 or 3), the atom tends to **lose** these electrons (making the valency equal to the number of valence electrons).

> [!key] Atoms of elements with a completely filled outermost shell (having 8 electrons, or 2 for the K shell alone, like helium) show almost no chemical activity — their combining capacity, i.e. valency, is zero, since they are already in the most stable arrangement. These are the **noble gases**.

## Atomic Number, Mass Number and Isotopes

- **Atomic number (Z)** — the total number of protons present in the nucleus of an atom (this uniquely identifies an element, since the number of protons is always characteristic of the element).
- **Mass number (A)** — the sum of the total number of protons and neutrons present in the nucleus of an atom.

**Isotopes** are atoms of the same element that have the same atomic number, but different mass numbers (i.e. they differ in the number of neutrons). e.g. ordinary hydrogen (¹H, protium), deuterium (²H), and tritium (³H) are the three isotopes of hydrogen.

> [!note] Isotopes of the same element have almost identical chemical properties (since chemical properties depend on the number of electrons/protons), but different physical properties (since physical properties often depend on mass). This similarity in chemical behaviour is exploited in some very important uses of isotopes, such as an isotope of uranium being used as a fuel in nuclear reactors, an isotope of cobalt being used in the treatment of cancer, and an isotope of iodine being used in the treatment of goitre.

**Isobars** are atoms of different elements that have the same mass number, but different atomic numbers. e.g. calcium (atomic number 20) and argon (atomic number 18) both have a mass number of 40, so they are isobars.
    `,
    experiments: [
      {
        id: "rutherford-gold-foil-recreation",
        title: "Understanding Rutherford's Gold Foil (Alpha Scattering) Experiment",
        aim: "To trace the setup, observations and conclusions of Rutherford's historic alpha-particle scattering experiment (a conceptual/historical demonstration, since real alpha sources are not used in a school lab).",
        materials: ["A diagram/model of the alpha scattering apparatus (radioactive source, thin gold foil, circular fluorescent screen detector)", "A marble/ball-and-pin analogy setup (optional, to model deflection by a small central obstacle)"],
        procedure: [
          "Study the experimental setup: a narrow beam of fast-moving alpha particles is directed at an extremely thin sheet of gold foil, surrounded by a circular fluorescent screen that lights up wherever an alpha particle strikes it.",
          "Trace the three key observations: most particles pass straight through; a small fraction deflect at various angles; a very tiny fraction bounce almost straight back.",
          "Relate each observation to what it reveals about the internal structure of a gold atom.",
        ],
        observation: "Most of the alpha particles pass through the foil with no deflection at all; a few are deflected through small angles; and about 1 in 12000 bounce back almost the way they came.",
        conclusion:
          "Since most particles passed through undeflected, most of the volume of an atom must be empty space. Since only a few particles were deflected, and only by a small angle, the positively charged part of the atom must occupy a very small volume. Since a very few particles bounced back almost completely, an extremely small, dense, positively charged region — which Rutherford named the nucleus — must exist at the centre of the atom, concentrating almost all of the atom's mass and repelling the positively charged alpha particles that happen to come very close to it.",
        visual: {
          before: "hsl(45 30% 92%)",
          labels: { before: "Alpha particles approaching gold foil", after: "Most pass through; a few deflect or bounce back" },
        },
      },
      {
        id: "electron-shell-configuration-modelling",
        title: "Modelling Electron Distribution in Shells (Bohr-Bury Scheme)",
        aim: "To practise determining and modelling the electronic configuration of the first twenty elements using the 2n² rule.",
        materials: ["A periodic table with atomic numbers", "Coloured balls/beads (to represent electrons)", "Concentric circles drawn on paper or a model board (to represent K, L, M shells)"],
        procedure: [
          "For a chosen element (e.g. sulphur, atomic number 16), determine the total number of electrons from its atomic number.",
          "Fill the K shell first (maximum 2 electrons), then the L shell (maximum 8), then continue filling the M shell with any remaining electrons, following the rule that the outermost shell should not exceed 8.",
          "Physically place beads on the concentric circles to represent this final distribution, and record the electronic configuration (e.g. '2, 8, 6' for sulphur).",
        ],
        observation: "For sulphur (Z = 16): the K shell fills with 2, the L shell fills with 8, and the remaining 6 electrons occupy the M shell, giving the configuration 2, 8, 6.",
        conclusion:
          "By following the fixed rules for electron distribution (filling the innermost shell first, maximum 2n² per shell, and a maximum of 8 in the outermost shell), the electronic configuration of any element up to around atomic number 20 can be determined and modelled reliably — this configuration, especially the number of valence (outermost) electrons, directly determines the element's chemical valency and reactivity.",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "Empty concentric shells", after: "Electrons filled: 2, 8, 6 for sulphur" },
        },
      },
      {
        id: "electroscope-static-charge-demo",
        title: "Demonstrating Charge Using a Simple Electroscope",
        aim: "To show the presence of electric charge (related to the sub-atomic particles that carry it) using a simple homemade electroscope.",
        materials: ["A glass jar with a rubber/cork stopper", "A metal rod or paperclip passed through the stopper", "Two thin strips of aluminium foil", "A rubbed plastic rod (e.g. a comb) and a piece of wool/silk"],
        procedure: [
          "Assemble a simple electroscope: pass a metal rod through the stopper of the jar, with two thin aluminium foil strips hanging from its lower end inside the jar, and a small metal knob/plate at the top outside the jar.",
          "Rub a plastic comb vigorously with a piece of wool or silk to charge it (via the transfer of electrons).",
          "Bring the charged comb close to (without touching) the knob at the top of the electroscope, and observe the foil strips.",
        ],
        observation: "As the charged comb approaches, the two foil strips at the bottom of the jar move apart (diverge) from each other.",
        conclusion:
          "Rubbing the comb with wool transfers electrons between the two materials, giving the comb a net electric charge. When this charged comb is brought near the electroscope's knob, it induces a similar charge on the foil strips (by repelling or attracting the mobile electrons within the metal), causing both strips to acquire the same type of charge and repel each other, making them diverge — a simple, direct demonstration that charged sub-atomic particles (electrons) exist and can be transferred between materials, and that like charges repel one another.",
        visual: {
          before: "hsl(210 15% 92%)",
          after: "hsl(210 15% 92%)",
          labels: { before: "Foil strips hanging together", after: "Strips diverge — charge detected" },
        },
      },
      {
        id: "isotope-mass-number-calculation",
        title: "Calculating the Number of Protons, Neutrons and Electrons in Isotopes",
        aim: "To practise using atomic number and mass number to determine the sub-atomic particle composition of different isotopes of an element.",
        materials: ["A data table of atomic number and mass numbers for isotopes of hydrogen, carbon and chlorine", "Paper and pencil"],
        procedure: [
          "For each isotope listed (e.g. ¹H, ²H, ³H, or ³⁵Cl and ³⁷Cl), note the atomic number (Z) and mass number (A).",
          "Calculate the number of protons (= Z), electrons (= Z, for a neutral atom), and neutrons (= A − Z) for each isotope.",
          "Compare the results across isotopes of the same element.",
        ],
        observation:
          "For chlorine's two isotopes: ³⁵Cl (Z = 17) has 17 protons, 17 electrons, and 35 − 17 = 18 neutrons; ³⁷Cl (Z = 17) has the same 17 protons and 17 electrons, but 37 − 17 = 20 neutrons.",
        conclusion:
          "Isotopes of the same element always have the identical number of protons (and hence the same atomic number and the same number of electrons in a neutral atom), but they differ specifically in the number of neutrons present in the nucleus — this difference in neutron number (and hence mass) is the sole distinguishing feature of isotopes, explaining why isotopes share nearly identical chemical properties (governed by electron/proton number) but can differ in physical properties like density (governed by total mass).",
        visual: {
          before: "hsl(210 15% 92%)",
          labels: { before: "³⁵Cl: 17p, 17e, 18n", after: "³⁷Cl: 17p, 17e, 20n" },
        },
      },
      {
        id: "flame-test-electron-transitions-c9",
        title: "Flame Colours as Evidence for Discrete Electron Shells",
        aim: "To use the flame test to gather simple, observable evidence supporting Bohr's idea of fixed, discrete electron energy levels (shells).",
        materials: ["Salts of sodium and copper (e.g. chlorides)", "A nichrome wire loop", "Concentrated HCl", "A Bunsen burner"],
        procedure: [
          "Clean a nichrome wire loop by dipping it in concentrated HCl and heating it in the flame until it gives no colour.",
          "Dip the clean wire into a sodium salt sample and hold it in the flame; note the colour. Clean the wire and repeat with the copper salt.",
        ],
        observation: "The sodium salt gives a persistent golden-yellow flame; the copper salt gives a distinct blue-green flame.",
        conclusion:
          "Heating excites an electron in the outer shell of the metal atom to a higher, temporarily unstable energy level; as the electron falls back to its original, stable shell, it releases the extra energy as light of a specific, fixed colour (wavelength), which is different for each element because each has its own characteristic set of discrete shell energies. The fact that each element gives one specific, reproducible flame colour — rather than a continuous range of colours — is simple, observable evidence supporting Bohr's postulate that electrons can only occupy certain fixed, discrete orbits (shells) around the nucleus, rather than any arbitrary distance.",
        visual: {
          before: "hsl(30 10% 20%)",
          after: "hsl(48 90% 55%)",
          flame: true,
          labels: { before: "Clean wire in flame", after: "Golden-yellow flame — sodium" },
        },
      },
    ],
    objectiveQuestions: [
      {
        question: "The electron was discovered by:",
        options: ["J. Chadwick", "E. Goldstein", "J. J. Thomson", "Niels Bohr"],
        correctAnswer: 2,
        explanation: "J. J. Thomson discovered the electron through his studies of cathode rays in a discharge tube.",
      },
      {
        question: "In Rutherford's gold foil experiment, the fact that a very small fraction of alpha particles bounced back almost 180° indicated that:",
        options: [
          "The atom is entirely empty",
          "All the positive charge and most of the mass of the atom are concentrated in a tiny, dense nucleus",
          "Electrons are heavier than protons",
          "Gold atoms have no nucleus",
        ],
        correctAnswer: 1,
        explanation: "The rare, sharp deflections indicated that a small, dense, positively charged nucleus at the centre of the atom was strongly repelling the few alpha particles that came very close to it.",
      },
      {
        question: "According to Bohr's model of the atom, electrons revolve around the nucleus:",
        options: [
          "In any random path",
          "Only in certain fixed, discrete orbits (shells), without radiating energy",
          "Without any orbit at all",
          "Only at the centre of the atom",
        ],
        correctAnswer: 1,
        explanation: "Bohr proposed that electrons occupy only certain fixed, discrete orbits (shells), and do not radiate energy while revolving in these orbits.",
      },
      {
        question: "The maximum number of electrons that can be accommodated in the M shell (n = 3) is:",
        options: ["2", "8", "18", "32"],
        correctAnswer: 2,
        explanation: "Using the formula 2n², for n = 3: 2 × 3² = 18, the maximum number of electrons the M shell can hold.",
      },
      {
        question: "The electronic configuration of chlorine (atomic number 17) is:",
        options: ["2, 8, 8", "2, 7, 8", "2, 8, 7", "8, 8, 1"],
        correctAnswer: 2,
        explanation: "Filling shells in order (K = 2, L = 8) leaves 17 − 2 − 8 = 7 electrons for the M shell, giving the configuration 2, 8, 7.",
      },
      {
        question: "Atomic number is defined as the number of _____ in the nucleus of an atom.",
        options: ["Neutrons", "Protons", "Electrons only, not protons", "Protons and neutrons combined"],
        correctAnswer: 1,
        explanation: "Atomic number (Z) is the number of protons in the nucleus of an atom, which uniquely identifies the element.",
      },
      {
        question: "Isotopes of an element have the same atomic number but different:",
        options: ["Number of protons", "Number of electrons", "Mass number (due to differing neutrons)", "Chemical properties"],
        correctAnswer: 2,
        explanation: "Isotopes have the same number of protons (same atomic number) but a different number of neutrons, giving them different mass numbers.",
      },
      {
        question: "Calcium (atomic number 20, mass number 40) and argon (atomic number 18, mass number 40) are examples of:",
        options: ["Isotopes", "Isobars", "Ions", "Identical elements"],
        correctAnswer: 1,
        explanation: "Isobars are atoms of different elements with the same mass number but different atomic numbers, as is the case for calcium and argon here.",
      },
      {
        question: "The valency of an element whose atom has 2 electrons in its outermost shell is generally:",
        options: ["0", "1", "2", "8"],
        correctAnswer: 2,
        explanation: "Since the number of valence electrons (2) is small, the atom tends to lose them, giving it a valency equal to that number, 2.",
      },
      {
        question: "Noble gases are largely unreactive because:",
        options: [
          "They have no electrons at all",
          "Their outermost shell is already completely filled (a stable, 'full-shell' arrangement)",
          "They have too many protons",
          "They do not exist in nature",
        ],
        correctAnswer: 1,
        explanation: "Noble gases have a completely filled outermost shell (8 electrons, or 2 for helium's K shell), making them highly stable and largely unreactive, with a valency of essentially zero.",
      },
    ],
    subjectiveQuestions: [
      {
        marks: 1,
        question: "Name the three sub-atomic particles present in an atom.",
        answer: "Electrons (negatively charged), protons (positively charged), and neutrons (no charge).",
      },
      {
        marks: 1,
        question: "Define mass number.",
        answer: "The mass number of an atom is the sum of the total number of protons and neutrons present in its nucleus.",
      },
      {
        marks: 2,
        question: "State two observations from Rutherford's alpha-scattering experiment and the corresponding conclusion drawn from each.",
        answer:
          "**Observation 1:** most alpha particles passed straight through the gold foil undeflected. **Conclusion:** most of the space inside an atom is empty.\n**Observation 2:** a very small fraction of alpha particles bounced back almost completely. **Conclusion:** a tiny, dense, positively charged nucleus, containing almost the entire mass of the atom, exists at the centre.",
      },
      {
        marks: 2,
        question: "What is the main drawback of Rutherford's model of the atom?",
        answer:
          "According to the theory of electromagnetism, an electron revolving in a circular path around the nucleus is continuously accelerating, and an accelerating charged particle should continuously radiate (lose) energy. This would cause the electron to spiral inward and eventually fall into the nucleus, making the atom highly unstable — which contradicts the observed stability of real atoms, and Rutherford's model could not explain why this collapse doesn't actually happen.",
      },
      {
        marks: 2,
        question: "Write the electronic configuration of an atom with atomic number 12, and state its valency.",
        answer:
          "For atomic number 12: K shell gets 2, L shell gets 8, and the remaining 12 − 2 − 8 = 2 electrons go into the M shell, giving the configuration **2, 8, 2**. Since it has 2 valence electrons (a small number), it will tend to lose them, giving it a valency of **2**.",
      },
      {
        marks: 3,
        question: "Distinguish between isotopes and isobars, with one example of each.",
        answer:
          "**Isotopes** are atoms of the SAME element (same atomic number) that have different mass numbers, due to a different number of neutrons, e.g. protium (¹H) and deuterium (²H), both with atomic number 1. **Isobars** are atoms of DIFFERENT elements that happen to have the SAME mass number, but different atomic numbers, e.g. calcium (atomic number 20) and argon (atomic number 18), both with mass number 40.",
      },
      {
        marks: 3,
        question: "State the rules for distributing electrons in different shells of an atom.",
        answer:
          "1. The maximum number of electrons that can be accommodated in a given shell is given by the formula 2n², where n is the shell number (K = 1, L = 2, M = 3, and so on).\n2. The maximum number of electrons that can be accommodated in the outermost shell of an atom is 8, regardless of what 2n² would otherwise allow.\n3. Electrons are not filled into an outer shell until the inner shell(s) closer to the nucleus have already been completely filled.",
      },
      {
        marks: 3,
        question: "Explain how the number of valence electrons in an atom determines its valency, using sodium and chlorine as examples.",
        answer:
          "Sodium (electronic configuration 2, 8, 1) has just 1 valence (outermost shell) electron; since this is a small number, sodium tends to lose this single electron to attain a stable configuration, giving it a valency of 1. Chlorine (electronic configuration 2, 8, 7) has 7 valence electrons, which is close to the stable number of 8; since it is easier to gain just 1 more electron than to lose all 7, chlorine tends to gain 1 electron, giving it a valency of 8 − 7 = 1 as well (though by the opposite process — gaining rather than losing an electron). In both cases, the valency reflects how many electrons must be lost or gained to reach the most stable, fully-filled outer shell configuration.",
      },
      {
        marks: 5,
        question:
          "(a) Describe Rutherford's alpha-scattering experiment, including the apparatus and all three key observations. (b) State the atomic model that Rutherford proposed based on these observations.",
        answer:
          "(a) In this experiment, a narrow beam of fast-moving, positively charged alpha particles (emitted from a radioactive source) was directed at an extremely thin sheet of gold foil, only a few atoms thick. A circular screen coated with a fluorescent material (which produces a tiny flash of light wherever an alpha particle strikes it) was placed around the foil to detect the particles after they interacted with it.\nThe three key observations were: (i) most of the fast-moving alpha particles passed straight through the gold foil without any deflection; (ii) a small fraction of the particles were deflected by the foil through small angles; (iii) a very small fraction of the particles (about 1 in 12000) bounced back almost the way they had come, deflected by nearly 180°.\n(b) Based on these observations, Rutherford proposed a nuclear model of the atom, in which: a small, extremely dense, positively charged region — the nucleus — exists at the centre of the atom, containing almost all of the atom's mass; electrons revolve around this nucleus in defined orbits; and the size of the nucleus is very small compared to the overall size of the atom, with most of the atom's volume being empty space.",
      },
      {
        marks: 5,
        question:
          "(a) Explain Bohr's postulates for the structure of the atom, and how they addressed the main drawback of Rutherford's model. (b) Draw/describe the shell structure (electronic configuration) of an atom with atomic number 15.",
        answer:
          "(a) Bohr proposed that: (i) electrons revolve around the nucleus only in certain specific, permitted orbits of definite energy, called shells (labelled K, L, M, N, or n = 1, 2, 3, 4, ...); (ii) as long as an electron remains in one of these discrete orbits, it does NOT radiate (lose) energy, regardless of the fact that it is continuously accelerating in its circular path.\nThis directly addressed Rutherford's main drawback: since classical electromagnetic theory predicted that any accelerating, orbiting electron should continuously radiate energy and spiral into the nucleus (making atoms unstable), Bohr's postulate that electrons in these specific, fixed orbits do NOT radiate energy while they remain there explained why atoms are, in fact, observed to be stable, resolving the contradiction in Rutherford's original model.\n(b) For atomic number 15 (phosphorus): the K shell fills first with 2 electrons, the L shell fills next with 8 electrons, and the remaining 15 − 2 − 8 = 5 electrons occupy the M shell (as the outermost shell), giving the electronic configuration **2, 8, 5** — represented as three concentric circles (shells) around a central nucleus, with 2, 8 and 5 electrons respectively placed on each shell moving outward.",
      },
    ],
  },
];

export const getChapter = (id: string): Chapter | undefined =>
  chapters.find((c) => c.id === id);
