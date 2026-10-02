// Extended element information for detailed views
export interface ElementDetails {
  atomicNumber: number;
  uses: string[];
  history: string;
  funFacts: string[];
  healthEffects?: string;
  environmentalRole?: string;
  abundance?: string;
}

export const elementDetails: Record<number, ElementDetails> = {
  1: {
    atomicNumber: 1,
    uses: [
      "Fuel cells for clean energy vehicles",
      "Rocket propellant (liquid hydrogen)",
      "Petroleum refining and metal ore reduction",
      "Production of ammonia for fertilizers",
      "Hydrogenation of fats in food industry",
    ],
    history: "Henry Cavendish first recognized hydrogen as a distinct element in 1766, calling it 'inflammable air'. Antoine Lavoisier later named it 'hydrogen' from Greek words meaning 'water-former'.",
    funFacts: [
      "Stars are essentially giant hydrogen fusion reactors",
      "Hydrogen is the only element without any neutrons in its most common form",
      "A single gallon of liquid hydrogen weighs only about 0.5 pounds",
    ],
    abundance: "Most abundant element in the universe (75% of all normal matter)",
    environmentalRole: "Forms water (H₂O), essential for all known life forms",
  },
  2: {
    atomicNumber: 2,
    uses: [
      "MRI machines (cooling superconducting magnets)",
      "Weather balloons and airships",
      "Deep-sea diving (mixed with oxygen)",
      "Cryogenic research",
      "Leak detection in manufacturing",
    ],
    history: "Discovered in 1868 by Pierre Janssen during a solar eclipse and independently by Norman Lockyer. It was named 'helium' from the Greek word 'helios' (sun) because it was first detected in the sun's spectrum.",
    funFacts: [
      "Helium makes your voice squeaky because sound travels faster through it",
      "It's the only element that cannot be solidified at normal atmospheric pressure",
      "The US has a National Helium Reserve in Texas",
    ],
    abundance: "Second most abundant element in the universe",
    environmentalRole: "Completely inert - doesn't react with anything in nature",
  },
  6: {
    atomicNumber: 6,
    uses: [
      "Basis of all organic chemistry and life",
      "Steel production (carbon steel)",
      "Fuel (coal, oil, natural gas)",
      "Diamonds and graphite",
      "Carbon fiber for aerospace and sports equipment",
    ],
    history: "Known since ancient times. Antoine Lavoisier showed in 1772 that diamonds were a form of carbon. The name comes from Latin 'carbo' meaning charcoal.",
    funFacts: [
      "Your body contains about 18% carbon by mass",
      "A single carbon atom can form up to 4 bonds, enabling complex molecules",
      "Graphene (single layer of graphite) is the strongest material ever tested",
    ],
    abundance: "Fourth most abundant element in the universe",
    environmentalRole: "Carbon cycle is fundamental to Earth's climate and all ecosystems",
  },
  7: {
    atomicNumber: 7,
    uses: [
      "Ammonia production for fertilizers",
      "Food preservation (nitrogen flushing)",
      "Cryogenic freezing",
      "Explosives (TNT, nitroglycerine)",
      "Semiconductor manufacturing",
    ],
    history: "Discovered by Daniel Rutherford in 1772. Named from Greek words meaning 'nitre-forming' because it's found in nitre (potassium nitrate).",
    funFacts: [
      "You breathe in about 78% nitrogen with every breath",
      "Liquid nitrogen boils at -196°C, cold enough to freeze almost anything instantly",
      "The triple bond in N₂ is one of the strongest chemical bonds",
    ],
    abundance: "Makes up 78% of Earth's atmosphere",
    environmentalRole: "Essential for proteins and DNA in all living organisms",
  },
  8: {
    atomicNumber: 8,
    uses: [
      "Medical oxygen therapy",
      "Steel and metal production",
      "Rocket propulsion (liquid oxygen)",
      "Water treatment and purification",
      "Welding and cutting metals",
    ],
    history: "Discovered independently by Carl Wilhelm Scheele (1774) and Joseph Priestley (1774). Antoine Lavoisier named it 'oxygen' from Greek words meaning 'acid-former'.",
    funFacts: [
      "Oxygen is actually colorless, but liquid oxygen is pale blue",
      "About 2/3 of your body mass is oxygen (mostly in water)",
      "Ozone (O₃) in the upper atmosphere protects us from UV radiation",
    ],
    abundance: "Third most abundant element in the universe",
    environmentalRole: "Essential for cellular respiration in most living organisms",
  },
  26: {
    atomicNumber: 26,
    uses: [
      "Steel production (construction, vehicles)",
      "Cast iron cookware",
      "Magnets and electromagnets",
      "Hemoglobin in blood (oxygen transport)",
      "Fortified foods and supplements",
    ],
    history: "Iron has been used since at least 3000 BCE. The Iron Age began around 1200 BCE when iron tools became widespread. The name comes from Anglo-Saxon 'iren'.",
    funFacts: [
      "Earth's core is mostly iron and nickel",
      "Iron in your blood is why blood is red",
      "A neutron star's crust may contain iron atoms packed incredibly densely",
    ],
    abundance: "Most common element on Earth by mass",
    environmentalRole: "Essential for oxygen transport in most animals (hemoglobin)",
    healthEffects: "Iron deficiency causes anemia; excess iron can be toxic",
  },
  29: {
    atomicNumber: 29,
    uses: [
      "Electrical wiring and electronics",
      "Plumbing pipes and fittings",
      "Coins and jewelry",
      "Antimicrobial surfaces",
      "Bronze and brass alloys",
    ],
    history: "One of the first metals used by humans, dating back to 9000 BCE. The name 'copper' comes from 'Cyprus', where it was mined in ancient times.",
    funFacts: [
      "Copper is naturally antibacterial - doorknobs can self-disinfect",
      "The Statue of Liberty is covered with over 80 tons of copper",
      "Copper can be 100% recycled without losing its properties",
    ],
    abundance: "About 50 ppm in Earth's crust",
    healthEffects: "Essential trace element; copper deficiency affects immune function",
  },
  47: {
    atomicNumber: 47,
    uses: [
      "Jewelry and silverware",
      "Photography (silver halide film)",
      "Electronics (best electrical conductor)",
      "Solar panels",
      "Medical antimicrobials",
    ],
    history: "Known since ancient times. Silver artifacts date back to 4000 BCE. The symbol 'Ag' comes from Latin 'argentum'.",
    funFacts: [
      "Silver has the highest electrical and thermal conductivity of any element",
      "Ancient Egyptians valued silver more than gold",
      "Silver nanoparticles are used in wound dressings for their antibacterial properties",
    ],
    abundance: "About 0.07 ppm in Earth's crust",
  },
  79: {
    atomicNumber: 79,
    uses: [
      "Jewelry and decoration",
      "Currency and investment",
      "Electronics (corrosion-resistant contacts)",
      "Dentistry (gold fillings)",
      "Aerospace (heat shields)",
    ],
    history: "Known since at least 3000 BCE. Gold was the first metal widely used by humans for decoration. The symbol 'Au' comes from Latin 'aurum' meaning 'shining dawn'.",
    funFacts: [
      "All the gold ever mined would fit in a cube 21 meters on each side",
      "Gold is so malleable that one ounce can be beaten into a sheet covering 100 sq feet",
      "Olympic gold medals are actually mostly silver with gold plating",
    ],
    abundance: "About 0.004 ppm in Earth's crust",
  },
  92: {
    atomicNumber: 92,
    uses: [
      "Nuclear power generation",
      "Nuclear weapons",
      "Ship and submarine propulsion",
      "Counterweights and shielding",
      "Dating rocks and fossils",
    ],
    history: "Discovered by Martin Heinrich Klaproth in 1789 and named after the newly discovered planet Uranus. Fission was discovered in 1938 by Hahn and Strassmann.",
    funFacts: [
      "A kilogram of natural uranium used in a nuclear reactor yields roughly as much energy as burning 16,000 kilograms of coal",
      "Uranium is as common as tin in Earth's crust",
      "Natural uranium reactors existed 2 billion years ago in Gabon, Africa",
    ],
    abundance: "About 2.7 ppm in Earth's crust",
    environmentalRole: "Radioactive decay provides heat that drives plate tectonics",
    healthEffects: "Both radioactive and chemically toxic; exposure should be minimized",
  },
};

// Helper to get extended details for an element
export function getElementDetails(atomicNumber: number): ElementDetails | null {
  return elementDetails[atomicNumber] || null;
}
