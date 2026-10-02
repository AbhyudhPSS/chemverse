import { chapters } from "./class10";

export type ExperimentType = "simulation" | "calculator" | "lab" | "activity";

export interface Experiment {
  id: string;
  title: string;
  description: string;
  type: ExperimentType;
  difficulty: "beginner" | "intermediate" | "advanced";
  unit: string;
  tags: string[];
  icon: string; // emoji
  color: string; // tailwind color token
}

const baseExperiments: Experiment[] = [
  {
    id: "reaction-bench",
    title: "Reaction Bench",
    description:
      "Combine two reagents from the Class 10 shelf and watch what happens — colour changes, gas, precipitates and heat, with the balanced equation for each.",
    type: "lab",
    difficulty: "beginner",
    unit: "Chemical Reactions",
    tags: [
      "mix",
      "reaction",
      "displacement",
      "precipitate",
      "zinc",
      "iron sulphate",
      "copper sulphate",
      "acid",
      "neutralisation",
      "virtual lab",
      "class 10",
    ],
    icon: "⚗️",
    color: "cobalt",
  },
  // === Visual Simulations ===
  {
    id: "acid-base-titration",
    title: "Acid-Base Titration Simulator",
    description: "Watch the pH change in real-time as you add base to acid. See the titration curve develop and find the equivalence point.",
    type: "simulation",
    difficulty: "intermediate",
    unit: "Acids & Bases",
    tags: ["pH", "titration", "acid", "base", "equivalence point", "indicator", "buffer"],
    icon: "🧪",
    color: "cyanine",
  },
  {
    id: "gas-law-sim",
    title: "Ideal Gas Law Visualizer",
    description: "Adjust pressure, volume, temperature, and moles to see how gas particles behave. Watch PV = nRT in action.",
    type: "simulation",
    difficulty: "beginner",
    unit: "Intermolecular Forces",
    tags: ["gas", "pressure", "volume", "temperature", "PV=nRT", "Boyle", "Charles", "ideal gas"],
    icon: "💨",
    color: "iris",
  },
  {
    id: "reaction-rate-sim",
    title: "Reaction Rate Explorer",
    description: "Visualize how concentration, temperature, and catalysts affect the speed of a reaction with animated particle collisions.",
    type: "simulation",
    difficulty: "intermediate",
    unit: "Kinetics",
    tags: ["rate", "kinetics", "collision", "activation energy", "catalyst", "temperature", "concentration"],
    icon: "⚡",
    color: "saffron",
  },
  {
    id: "electron-config-builder",
    title: "Electron Configuration Builder",
    description: "Fill orbitals interactively following the Aufbau principle, Hund's rule, and the Pauli exclusion principle.",
    type: "activity",
    difficulty: "beginner",
    unit: "Atomic Structure",
    tags: ["electron", "orbital", "configuration", "aufbau", "Hund", "Pauli", "shell", "subshell"],
    icon: "⚛️",
    color: "magenta",
  },
  // === Interactive Calculators ===
  {
    id: "ph-calculator",
    title: "pH / pOH Calculator",
    description: "Calculate pH, pOH, [H⁺], and [OH⁻] from any one value. Includes a visual pH scale indicator.",
    type: "calculator",
    difficulty: "beginner",
    unit: "Acids & Bases",
    tags: ["pH", "pOH", "hydrogen ion", "hydroxide", "acid", "base", "neutral", "Kw"],
    icon: "🔢",
    color: "viridian",
  },
  {
    id: "molar-mass-calculator",
    title: "Molar Mass Calculator",
    description: "Enter any chemical formula and instantly get the molar mass with a breakdown of each element's contribution.",
    type: "calculator",
    difficulty: "beginner",
    unit: "Stoichiometry",
    tags: ["molar mass", "molecular weight", "formula", "element", "grams per mole"],
    icon: "⚖️",
    color: "cyanine",
  },
  {
    id: "dilution-calculator",
    title: "Dilution Calculator (M₁V₁ = M₂V₂)",
    description: "Solve dilution problems by entering any three values. Visualize the concentration change.",
    type: "calculator",
    difficulty: "beginner",
    unit: "Stoichiometry",
    tags: ["dilution", "concentration", "molarity", "volume", "M1V1", "solution"],
    icon: "💧",
    color: "iris",
  },
  {
    id: "gibbs-calculator",
    title: "Gibbs Free Energy Calculator",
    description: "Calculate ΔG from ΔH, ΔS, and temperature. Determine if a reaction is spontaneous.",
    type: "calculator",
    difficulty: "intermediate",
    unit: "Thermodynamics",
    tags: ["Gibbs", "free energy", "enthalpy", "entropy", "spontaneous", "thermodynamics", "ΔG"],
    icon: "🔥",
    color: "saffron",
  },
  // === Virtual Lab Procedures ===
  {
    id: "flame-test-lab",
    title: "Flame Test Virtual Lab",
    description: "Dip metal salt samples into a flame and identify elements by their characteristic emission colors.",
    type: "lab",
    difficulty: "beginner",
    unit: "Atomic Structure",
    tags: ["flame test", "emission", "color", "metal", "alkali", "spectrum", "identify"],
    icon: "🔬",
    color: "magenta",
  },
  {
    id: "calorimetry-lab",
    title: "Calorimetry Virtual Lab",
    description: "Measure temperature changes to calculate enthalpy of reaction. Use q = mcΔT in a simulated coffee cup calorimeter.",
    type: "lab",
    difficulty: "intermediate",
    unit: "Thermodynamics",
    tags: ["calorimetry", "enthalpy", "heat", "temperature", "specific heat", "q=mcΔT", "exothermic", "endothermic"],
    icon: "🌡️",
    color: "viridian",
  },
  {
    id: "electrochemistry-lab",
    title: "Build a Galvanic Cell",
    description: "Select electrodes and electrolytes to build a working galvanic cell. Measure voltage and predict spontaneity.",
    type: "lab",
    difficulty: "advanced",
    unit: "Electrochemistry",
    tags: ["galvanic", "voltaic", "cell", "electrode", "anode", "cathode", "voltage", "redox"],
    icon: "🔋",
    color: "cyanine",
  },
  // === Drag-and-Drop Activities ===
  {
    id: "balance-equations",
    title: "Equation Balancer Challenge",
    description: "Balance chemical equations by adjusting coefficients. Get instant feedback and track your streak!",
    type: "activity",
    difficulty: "beginner",
    unit: "Stoichiometry",
    tags: ["balance", "equation", "coefficient", "conservation", "mass", "stoichiometry"],
    icon: "⚖️",
    color: "saffron",
  },
  {
    id: "lewis-structure-builder",
    title: "Lewis Structure Builder",
    description: "Draw Lewis structures by placing electrons and bonds. Check for octet satisfaction and formal charge.",
    type: "activity",
    difficulty: "intermediate",
    unit: "Chemical Bonding",
    tags: ["Lewis", "structure", "dot", "bond", "lone pair", "octet", "formal charge", "resonance"],
    icon: "✏️",
    color: "iris",
  },
  {
    id: "molecular-geometry-explorer",
    title: "VSEPR Shape Explorer",
    description: "Arrange electron groups around a central atom and discover the resulting molecular geometry and bond angles.",
    type: "activity",
    difficulty: "intermediate",
    unit: "Chemical Bonding",
    tags: ["VSEPR", "geometry", "shape", "bond angle", "tetrahedral", "linear", "trigonal", "bent"],
    icon: "🔷",
    color: "viridian",
  },
  {
    id: "periodic-trend-sorter",
    title: "Periodic Trend Sorter",
    description: "Sort elements by atomic radius, electronegativity, or ionization energy. Test your knowledge of periodic trends!",
    type: "activity",
    difficulty: "beginner",
    unit: "Atomic Structure",
    tags: ["periodic", "trend", "radius", "electronegativity", "ionization", "sort", "rank"],
    icon: "📊",
    color: "magenta",
  },
];

/**
 * The NCERT Class 10 activities are authored once in `class10.ts` and surfaced
 * in the Lab from there, so the two listings can never drift apart.
 */
const class10Experiments: Experiment[] = chapters.flatMap((chapter) =>
  chapter.experiments.map((experiment) => ({
    id: `c10-${experiment.id}`,
    title: experiment.title,
    description: experiment.aim,
    type: "lab" as const,
    difficulty: "beginner" as const,
    unit: `Class 10 · Chapter ${chapter.number}`,
    tags: [
      "class 10",
      "ncert",
      chapter.title.toLowerCase(),
      ...(experiment.activityRef ? [experiment.activityRef.toLowerCase()] : []),
      ...experiment.title.toLowerCase().split(/\s+/),
    ],
    icon: "🧪",
    color: chapter.color,
  })),
);

/** Everything the Lab lists: built-in tools, the mixing bench, Class 10 activities. */
export const experiments: Experiment[] = [...baseExperiments, ...class10Experiments];

export const getExperiment = (id: string): Experiment | undefined =>
  experiments.find((e) => e.id === id);

export const experimentTypes: { value: ExperimentType; label: string; icon: string }[] = [
  { value: "simulation", label: "Simulations", icon: "🎬" },
  { value: "calculator", label: "Calculators", icon: "🔢" },
  { value: "lab", label: "Virtual Labs", icon: "🔬" },
  { value: "activity", label: "Activities", icon: "🎯" },
];

export const difficultyColors = {
  beginner: "text-viridian",
  intermediate: "text-saffron",
  advanced: "text-magenta",
};
