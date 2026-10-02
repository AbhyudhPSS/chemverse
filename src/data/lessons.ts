export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  description: string;
  videoUrl: string; // YouTube embed URL
  duration: string;
  notes: string; // Markdown-style notes
  quiz: QuizQuestion[];
}

export interface Unit {
  id: string;
  number: number;
  title: string;
  description: string;
}

/** The nine AP Chemistry units lessons are grouped under, in order. */
export const units: Unit[] = [
  {
    id: "atomic-structure",
    number: 1,
    title: "Atomic Structure",
    description: "Subatomic particles, the Bohr model, electron configuration, mass spectrometry.",
  },
  {
    id: "chemical-bonding",
    number: 2,
    title: "Chemical Bonding",
    description: "Ionic and covalent bonds, Lewis structures, VSEPR theory and hybridisation.",
  },
  {
    id: "intermolecular-forces",
    number: 3,
    title: "Intermolecular Forces",
    description: "Dispersion, dipole–dipole and hydrogen bonding, gas laws and phase changes.",
  },
  {
    id: "stoichiometry",
    number: 4,
    title: "Stoichiometry",
    description: "The mole concept, balancing equations, limiting reactants and redox.",
  },
  {
    id: "kinetics",
    number: 5,
    title: "Kinetics",
    description: "Rate laws, collision theory, reaction mechanisms and catalysis.",
  },
  {
    id: "thermodynamics",
    number: 6,
    title: "Thermodynamics",
    description: "Calorimetry, enthalpy, Hess's law and bond enthalpies.",
  },
  {
    id: "equilibrium",
    number: 7,
    title: "Equilibrium",
    description: "The equilibrium constant, Le Chatelier's principle, Ksp and reaction quotient.",
  },
  {
    id: "acids-bases",
    number: 8,
    title: "Acids & Bases",
    description: "The pH scale, strong and weak acids, titrations and buffers.",
  },
  {
    id: "electrochemistry",
    number: 9,
    title: "Electrochemistry",
    description: "Entropy, Gibbs free energy, galvanic cells and electrolysis.",
  },
];

export const lessons: Lesson[] = [
  // ==============================
  // Unit 1: Atomic Structure
  // ==============================
  {
    id: "what-is-atom",
    topicId: "atomic-structure",
    title: "What is an Atom?",
    description: "Explore subatomic particles and the fundamental building blocks of matter",
    videoUrl: "https://www.youtube.com/embed/h6LPAwAmnCQ",
    duration: "8 min",
    notes: `
# What is an Atom?

An **atom** is the smallest unit of matter that retains the chemical properties of an element. Everything around you—the air you breathe, the water you drink, and even your own body—is made up of atoms.

## How We Found the Pieces Inside an Atom

Nobody has ever seen an atom's insides directly — everything we know comes from a chain of experiments, each one overturning the model before it.

### J.J. Thomson and the electron (1897)
Thomson passed a high-voltage current through a near-vacuum tube and found a beam ("cathode rays") that bent toward a positively charged plate — proof it was made of negatively charged particles. These particles were the same no matter what gas or metal he used, so he concluded they must be a piece of *every* atom: the **electron**. He pictured the atom as a uniform sphere of positive charge with electrons embedded in it, like plums in a pudding — the "plum pudding model."

### Ernest Rutherford and the nucleus (1909)
Rutherford's team fired fast, positively charged alpha particles at a sheet of gold foil only a few atoms thick.
- Most particles sailed straight through, as if the foil were mostly empty space.
- A few deflected at large angles.
- A tiny fraction (about 1 in 8000) bounced almost straight back.

A uniform "pudding" of charge could never do that. Rutherford concluded that almost all of an atom's mass and *all* of its positive charge must be packed into a tiny, dense **nucleus**, with electrons occupying the largely empty space around it — the nuclear model that replaced Thomson's.

::diagram:rutherford-experiment

### James Chadwick and the neutron (1932)
The nucleus alone couldn't explain atomic mass — protons alone would make every nucleus far too light and far too repulsive (all that positive charge crammed together). Chadwick identified a third particle with about the same mass as a proton but **no charge**: the **neutron**. Neutrons add mass and help "dilute" the proton-proton repulsion that would otherwise blow the nucleus apart.

::diagram:atomic-models

## Structure of an Atom

Atoms consist of three types of subatomic particles:

::diagram:atom-structure

### 1. Protons (p⁺)
- **Location**: Nucleus (center)
- **Charge**: Positive (+1)
- **Mass**: 1.673 × 10⁻²⁷ kg
- The number of protons defines the element (atomic number)

### 2. Neutrons (n⁰)
- **Location**: Nucleus (center)
- **Charge**: Neutral (0)
- **Mass**: Similar to protons
- Neutrons add stability to the nucleus

### 3. Electrons (e⁻)
- **Location**: Electron cloud (orbiting the nucleus)
- **Charge**: Negative (-1)
- **Mass**: ~1/1836 of a proton
- Electrons determine chemical behavior

## Key Concepts

### Atomic Number (Z)
The number of protons in an atom. This defines which element it is.
- Hydrogen: Z = 1
- Carbon: Z = 6
- Oxygen: Z = 8

### Mass Number (A)
The total number of protons + neutrons in the nucleus.

### Isotopes
Atoms of the same element with different numbers of neutrons. Mass spectrometry is used to determine isotopic abundance and average atomic mass.

> **Isotope notation:** an isotope is written either as ᴬ_Z**X** (mass number top-left, atomic number bottom-left) or in "chem-speak" as **X-A**, e.g. carbon-14 is ¹⁴₆C, with 6 protons and 14 − 6 = 8 neutrons.

::diagram:hydrogen-isotopes

### Average Atomic Mass — A Worked Example

The number on the periodic table (e.g. chlorine's 35.45 amu) is a **weighted average** over all naturally occurring isotopes, not the mass of any single atom.

**Average atomic mass = Σ (isotope mass × fractional abundance)**

Chlorine has two isotopes: ³⁵Cl (34.97 amu, 75.77% abundant) and ³⁷Cl (36.97 amu, 24.23% abundant).

(34.97)(0.7577) + (36.97)(0.2423) = 26.50 + 8.96 = 35.45 amu

This matches the periodic table value exactly — and it also tells you *why* chlorine's atomic mass isn't a nice round number: it's a blend of two isotopes in an uneven ratio.

## Fun Facts 🧪
- Atoms are 99.9999% empty space!
- If an atom were the size of a football stadium, the nucleus would be a marble at the center
- There are about 7 × 10²⁷ atoms in the human body
    `,
    quiz: [
      {
        question: "What is the charge of a proton?",
        options: ["Negative", "Positive", "Neutral", "Variable"],
        correctAnswer: 1,
        explanation: "Protons have a positive charge of +1. This is one of the fundamental properties that distinguishes them from neutrons (neutral) and electrons (negative)."
      },
      {
        question: "Where are electrons located in an atom?",
        options: ["In the nucleus", "In the electron cloud", "Between protons", "Outside the atom"],
        correctAnswer: 1,
        explanation: "Electrons orbit the nucleus in regions called the electron cloud or electron shells. They never enter the nucleus under normal conditions."
      },
      {
        question: "What determines which element an atom is?",
        options: ["Number of electrons", "Number of neutrons", "Number of protons", "Total mass"],
        correctAnswer: 2,
        explanation: "The atomic number (number of protons) uniquely identifies each element. For example, all carbon atoms have exactly 6 protons."
      },
      {
        question: "Which particle has no electrical charge?",
        options: ["Proton", "Electron", "Neutron", "All have charges"],
        correctAnswer: 2,
        explanation: "Neutrons are electrically neutral (no charge). They help hold the nucleus together and add to the atom's mass."
      },
      {
        question: "What is the mass number of an atom?",
        options: ["Number of protons only", "Number of electrons only", "Protons + Neutrons", "Protons + Electrons"],
        correctAnswer: 2,
        explanation: "Mass number (A) = number of protons + number of neutrons. Electrons are so light they don't significantly contribute to mass."
      }
    ]
  },
  {
    id: "bohr-model",
    topicId: "atomic-structure",
    title: "The Bohr Model",
    description: "Understand quantized energy levels and electron orbits",
    videoUrl: "https://www.youtube.com/embed/fm2C0ovz-3M",
    duration: "4 min",
    notes: `
# The Bohr Model

In 1913, **Niels Bohr** proposed a revolutionary model of the atom that explained how electrons orbit the nucleus in specific energy levels.

::diagram:bohr-model

## Key Features of the Bohr Model

### 1. Quantized Energy Levels
- Electrons can only exist in specific orbits (energy levels)
- These orbits are called **shells** (n = 1, 2, 3, ...)
- Each shell has a specific energy associated with it

### 2. Electron Transitions
- Electrons can jump between energy levels
- **Absorption**: Electron gains energy, jumps to higher level
- **Emission**: Electron loses energy, falls to lower level
- Energy is released as light (photons)

### 3. Shell Capacity
Maximum electrons per shell: **2n²**
- Shell 1 (K): 2 electrons
- Shell 2 (L): 8 electrons
- Shell 3 (M): 18 electrons
- Shell 4 (N): 32 electrons

## Line Spectra — the Experimental Evidence

If you pass electricity through hydrogen gas in a tube and view the light through a prism, you don't see a smooth rainbow (a **continuous spectrum**). You see a handful of sharp, separate colored lines against a dark background — an **emission spectrum**. Shine white light *through* cool hydrogen gas instead, and you see the same lines, but missing from an otherwise continuous rainbow — an **absorption spectrum**.

This was the single biggest clue behind Bohr's model: if electrons could sit at *any* energy, atoms would absorb/emit *every* wavelength and you'd see a smooth rainbow. Seeing only a few sharp lines means only a few specific energy jumps are allowed — direct evidence for quantized shells.

### The Rydberg Equation

For hydrogen specifically, the wavelengths of these lines are predicted almost perfectly by:

1/λ = R × (1/n₁² − 1/n₂²)

where R is the Rydberg constant (1.097 × 10⁷ m⁻¹) and n₁ < n₂ are the shell numbers involved in the transition. The **Balmer series** (visible lines) corresponds to every transition that ends at n₁ = 2.

## Why the Bohr Model Matters

The Bohr model explained:
- Why atoms emit specific colors of light
- The hydrogen spectrum
- Chemical bonding basics

## Limitations — and What Replaced It

While groundbreaking, the Bohr model:
- Only works perfectly for **hydrogen** (one electron) — for multi-electron atoms, electron-electron repulsion throws off the simple energy formula.
- Treats electrons as tiny orbiting planets with a definite position and path, which contradicts the **Heisenberg Uncertainty Principle** (you cannot simultaneously know an electron's exact position and momentum).
- Has been replaced by the **quantum mechanical model**, which describes electrons not as particles in fixed circular "orbits" but as three-dimensional probability clouds called **orbitals** — regions where an electron is *likely* to be found, with no single definite path. The shell numbers (n = 1, 2, 3...) survive into the modern model as the *principal quantum number*, but the neat circular orbits do not.

## Historical Impact 🏆
Niels Bohr won the Nobel Prize in Physics in 1922 for this work!
    `,
    quiz: [
      {
        question: "According to the Bohr model, where do electrons exist?",
        options: ["Anywhere around the nucleus", "Only in specific energy levels", "Inside the nucleus", "In random positions"],
        correctAnswer: 1,
        explanation: "The key insight of the Bohr model is that electrons can only exist in specific, quantized energy levels or 'orbits' around the nucleus."
      },
      {
        question: "What happens when an electron moves to a lower energy level?",
        options: ["It absorbs energy", "It emits light", "Nothing happens", "It becomes a proton"],
        correctAnswer: 1,
        explanation: "When an electron falls to a lower energy level, it releases energy in the form of light (a photon). This is called emission."
      },
      {
        question: "How many electrons can the second shell (L) hold?",
        options: ["2", "6", "8", "18"],
        correctAnswer: 2,
        explanation: "Using the formula 2n², where n=2: 2(2)² = 2(4) = 8 electrons maximum in the second shell."
      },
      {
        question: "Who proposed the Bohr model of the atom?",
        options: ["Ernest Rutherford", "J.J. Thomson", "Niels Bohr", "Albert Einstein"],
        correctAnswer: 2,
        explanation: "Niels Bohr, a Danish physicist, proposed this model in 1913 and won the Nobel Prize for it in 1922."
      }
    ]
  },
  {
    id: "electron-shells",
    topicId: "atomic-structure",
    title: "Electron Shells & Orbitals",
    description: "Examine electron distribution within sublevels and orbital diagrams",
    videoUrl: "https://www.youtube.com/embed/yADrWdNTWEc",
    duration: "17 min",
    notes: `
# Electron Shells & Orbitals

Understanding electron arrangement is crucial for predicting chemical behavior.

## Energy Levels (Shells)

Electrons occupy **shells** at increasing distances from the nucleus:

| Shell | Name | Max Electrons |
|-------|------|---------------|
| n=1   | K    | 2             |
| n=2   | L    | 8             |
| n=3   | M    | 18            |
| n=4   | N    | 32            |

## Subshells (Orbitals)

Each shell contains **subshells** of different shapes:

::diagram:orbital-shapes

### s Orbital
- Shape: Spherical
- Holds: 2 electrons
- Present in: All shells

### p Orbital
- Shape: Dumbbell (figure-8)
- Holds: 6 electrons (3 orbitals × 2)
- Present in: Shell 2 and above

### d Orbital
- Shape: Cloverleaf
- Holds: 10 electrons (5 orbitals × 2)
- Present in: Shell 3 and above

### f Orbital
- Shape: Complex
- Holds: 14 electrons (7 orbitals × 2)
- Present in: Shell 4 and above

## Electron Configuration

The order of filling orbitals follows the **Aufbau Principle** ("building-up principle") — electrons fill the lowest-energy orbitals first:

1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p → 5s → 4d → 5p → 6s → 4f...

### Example Configurations
- **Hydrogen (H)**: 1s¹
- **Carbon (C)**: 1s² 2s² 2p²
- **Oxygen (O)**: 1s² 2s² 2p⁴
- **Iron (Fe)**: 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶

### Noble Gas Shorthand
Writing out all of an atom's electrons gets tedious for heavier elements, so chemists abbreviate the filled inner shells with the symbol of the noble gas that has that exact configuration, in brackets.
- Sodium (full): 1s² 2s² 2p⁶ 3s¹ → shorthand: **[Ne] 3s¹**
- Iron (full): 1s² 2s² 2p⁶ 3s² 3p⁶ 4s² 3d⁶ → shorthand: **[Ar] 4s² 3d⁶**

### Configurations of Ions
Remove or add electrons from the **outermost** shell first (even if a different sub-shell was filled last).
- Fe → Fe²⁺: remove the two 4s electrons first → **[Ar] 3d⁶** (not 3d⁴4s², even though 4s filled before 3d)
- Cl → Cl⁻: add one electron to the 3p sub-shell → **[Ne] 3s² 3p⁶** (same configuration as argon)

## Two Rules That Govern *How* Orbitals Fill

::diagram:orbital-diagram

### Pauli Exclusion Principle
No two electrons in the same atom can have an identical set of four quantum numbers. In practice, this means **each orbital holds at most 2 electrons, and they must have opposite spins** (one "up," one "down").

### Hund's Rule of Maximum Multiplicity
When filling a set of orbitals of equal energy (like the three 2p orbitals), electrons occupy **each orbital singly first**, all with parallel spin, before any orbital gets a second electron. Nitrogen (1s² 2s² 2p³) puts one electron in each of its three 2p orbitals rather than pairing two up and leaving one empty — this minimizes electron-electron repulsion and is the lower-energy, more stable arrangement.

### Exceptions to the Simple Aufbau Order
A handful of transition metals don't follow the textbook filling order, because a **half-filled or fully-filled d sub-shell is unusually stable**:
- **Chromium (Cr, Z = 24)**: expected [Ar] 4s² 3d⁴, actually **[Ar] 4s¹ 3d⁵** (half-filled 3d is more stable than a full 4s)
- **Copper (Cu, Z = 29)**: expected [Ar] 4s² 3d⁹, actually **[Ar] 4s¹ 3d¹⁰** (fully-filled 3d wins out)

## Valence Electrons

The electrons in the **outermost shell** are called valence electrons. They determine:
- Chemical reactivity
- Bonding behavior
- Element properties
    `,
    quiz: [
      {
        question: "What shape is an s orbital?",
        options: ["Dumbbell", "Spherical", "Cloverleaf", "Ring"],
        correctAnswer: 1,
        explanation: "s orbitals are spherical in shape, centered around the nucleus. This is the simplest orbital shape."
      },
      {
        question: "How many electrons can a p subshell hold?",
        options: ["2", "6", "10", "14"],
        correctAnswer: 1,
        explanation: "A p subshell contains 3 orbitals, and each orbital can hold 2 electrons, so 3 × 2 = 6 electrons total."
      },
      {
        question: "What are valence electrons?",
        options: ["Electrons in the nucleus", "Electrons in the innermost shell", "Electrons in the outermost shell", "All electrons"],
        correctAnswer: 2,
        explanation: "Valence electrons are those in the outermost shell. They're responsible for chemical bonding and reactivity."
      },
      {
        question: "Which subshell is filled after 3p?",
        options: ["3d", "4s", "4p", "3f"],
        correctAnswer: 1,
        explanation: "According to the Aufbau principle, 4s is filled before 3d because it has lower energy. The order is: 3p → 4s → 3d."
      }
    ]
  },
  {
    id: "mass-spectrometry",
    topicId: "atomic-structure",
    title: "Mass Spectrometry & Periodic Trends",
    description: "Quantitative determination of isotopic distribution and periodic trends",
    videoUrl: "https://www.youtube.com/embed/FqX-PesWgF8",
    duration: "1 hr 46 min",
    notes: `
# Mass Spectrometry & Periodic Trends

## Mass Spectrometry

Mass spectrometry is an analytical technique that measures the **mass-to-charge ratio** of ions to determine elemental composition and isotopic distribution.

### How It Works
1. **Ionization**: Atoms are bombarded with electrons to form positive ions
2. **Acceleration**: Ions are accelerated through an electric field
3. **Deflection**: Ions are deflected by a magnetic field (lighter ions deflect more)
4. **Detection**: Ions are detected and their abundances recorded

::diagram:mass-spectrometer

### Reading a Mass Spectrum
- **x-axis**: Mass-to-charge ratio (m/z)
- **y-axis**: Relative abundance (%)
- Each peak represents a different isotope

### Example: Chlorine
- ³⁵Cl: 75.77% abundance
- ³⁷Cl: 24.23% abundance
- Average atomic mass: 35.45 amu

**Worked calculation:** average atomic mass = Σ(isotope mass × fractional abundance) = (34.97)(0.7577) + (36.97)(0.2423) = 26.50 + 8.96 = **35.45 amu** — matching the periodic table value, and confirming the mass spectrum's abundances.

## Photoelectron Spectroscopy (PES)

PES provides empirical evidence for the **shell model** of the atom.

### Key Concepts
- Measures the energy required to eject electrons from various shells
- Higher binding energy = closer to nucleus
- Peak height = number of electrons in that subshell

## Periodic Trends

Trends governed by **Coulombic attraction** between nucleus and valence electrons:

### Across a Period (→)
- Atomic radius: **Decreases**
- Ionization energy: **Increases**
- Electronegativity: **Increases**

### Down a Group (↓)
- Atomic radius: **Increases**
- Ionization energy: **Decreases**
- Electronegativity: **Decreases**

### Effective Nuclear Charge (Zeff)
The net positive charge experienced by valence electrons, accounting for shielding by inner electrons.

## Successive Ionization Energies — Finding the Valence Electron Count

Removing electrons one at a time from an atom costs progressively more energy (IE₁ < IE₂ < IE₃ ...), but the jump is small between electrons in the *same* shell and **huge** the moment you start removing an electron from a full inner shell. This pattern is direct experimental evidence for the shell model.

**Example — magnesium (2 valence electrons, [Ne] 3s²):**

| Ionization | IE (MJ/mol) |
|---|---|
| IE₁ | 0.74 |
| IE₂ | 1.45 |
| IE₃ | 7.73 ← huge jump |
| IE₄ | 10.5 |

The jump between IE₂ and IE₃ is nearly 5-fold, because IE₃ requires reaching into the full, stable [Ne] core — strong evidence that magnesium has exactly **2 valence electrons**.

## Isoelectronic Series

Ions with the *same number of electrons* but different nuclear charge are called an **isoelectronic series**. Since they all have identical electron configurations, the only thing that changes their size is how hard the nucleus pulls on that fixed electron count.

**Example:** O²⁻, F⁻, Ne, Na⁺, Mg²⁺ all have 10 electrons ([Ne] configuration), but their nuclear charge rises from 8 to 12 protons. More protons pulling on the same 10 electrons means a smaller radius, so:

O²⁻ > F⁻ > Ne > Na⁺ > Mg²⁺

(largest to smallest)
    `,
    quiz: [
      {
        question: "What does mass spectrometry measure?",
        options: ["Speed of atoms", "Mass-to-charge ratio of ions", "Color of elements", "Temperature of reactions"],
        correctAnswer: 1,
        explanation: "Mass spectrometry measures the mass-to-charge ratio (m/z) of ions, which allows determination of isotopic composition and atomic mass."
      },
      {
        question: "What happens to ionization energy across a period?",
        options: ["Decreases", "Increases", "Stays the same", "Fluctuates randomly"],
        correctAnswer: 1,
        explanation: "Ionization energy increases across a period because the effective nuclear charge increases, making electrons harder to remove."
      },
      {
        question: "In PES, a peak with high binding energy indicates electrons that are:",
        options: ["Far from the nucleus", "Close to the nucleus", "In the valence shell", "Unbonded"],
        correctAnswer: 1,
        explanation: "High binding energy means the electrons are closer to the nucleus and are held more tightly, requiring more energy to remove."
      },
      {
        question: "Why does atomic radius decrease across a period?",
        options: ["Fewer protons", "More electron shells", "Increased effective nuclear charge", "Electrons are lost"],
        correctAnswer: 2,
        explanation: "As you move across a period, more protons are added but electrons go into the same shell. The increased nuclear charge pulls electrons closer."
      }
    ]
  },

  // ==============================
  // Unit 2: Molecular & Ionic Compounds
  // ==============================
  {
    id: "ionic-bonds",
    topicId: "chemical-bonding",
    title: "Ionic vs. Covalent Bonding",
    description: "Comparative study of electrostatic attraction in ionic lattices versus electron-pair sharing",
    videoUrl: "https://www.youtube.com/embed/K75r6pSZBaM",
    duration: "8 min",
    notes: `
# Ionic vs. Covalent Bonding

Chemical bonding is driven by the behavior of valence electrons: **transfer** (ionic), **sharing** (covalent), or **delocalization** (metallic).

## Ionic Bonds

Ionic bonds form when electrons are **transferred** from one atom to another.

### How They Form
1. A metal atom **loses** electrons → becomes a positive ion (cation)
2. A nonmetal atom **gains** electrons → becomes a negative ion (anion)
3. Opposite charges **attract** → ionic bond forms

### Example: Sodium Chloride (NaCl)
- Na loses 1 electron → Na⁺
- Cl gains 1 electron → Cl⁻
- Electrostatic attraction → NaCl crystal lattice

::diagram:ionic-covalent-formation

::diagram:nacl-lattice

### Properties of Ionic Compounds
| Property | Ionic Compounds |
|----------|-----------------|
| State at room temp | Usually solid |
| Melting point | High (500-2000°C) |
| Conductivity (solid) | Poor |
| Conductivity (molten/dissolved) | Good |
| Structure | Crystal lattice |

### What Actually Decides "Ionic" vs "Covalent"? Electronegativity Difference

There isn't a hard line between ionic and covalent bonding — it's a spectrum, and where a particular bond sits on it is set by the **electronegativity difference (ΔEN)** between the two atoms.

| ΔEN | Bond type |
|---|---|
| 0 | Nonpolar covalent (e.g. Cl-Cl, ΔEN = 0) |
| 0 - ~0.4 | Weakly polar covalent |
| ~0.4 - ~1.7 | Polar covalent |
| Greater than ~1.7 | Ionic (treated as essentially complete electron transfer) |

There's nothing magic about 1.7 — it's just a common rule-of-thumb cutoff. HF (ΔEN ≈ 1.9) is still usually classed as a (very polar) covalent molecule, not ionic, because fluorine and hydrogen are both nonmetals; the metal/nonmetal combination matters as much as the number itself.

### Lattice Energy — Why Ionic Compounds Have Such High Melting Points

**Lattice energy** is the energy released when gaseous ions come together to form one mole of a solid ionic crystal (equivalently, the energy required to tear the crystal apart back into gaseous ions). It is what actually determines the melting point, hardness, and solubility patterns of an ionic compound.

Lattice energy ∝ (Q₁ × Q₂) ÷ r

Written in words: lattice energy increases (bonds get stronger) when the **ionic charges are larger** and decreases when the **ions are farther apart (larger radius)**. This is just Coulomb's Law applied to a crystal.

- MgO (charges +2/-2, small ions) has an enormous lattice energy (~3800 kJ/mol) and a melting point of 2852°C.
- NaCl (charges +1/-1, larger ions) has a much smaller lattice energy (~790 kJ/mol) and melts at a comparatively low 801°C.

### Bond Length and Bond Energy

Within a family of similar bonds, **shorter bonds are stronger** (more energy is needed to break them), because the nuclei are held closer together by the shared/transferred electron density. This is why C≡C (triple, 120 pm, 839 kJ/mol) is both shorter and stronger than C=C (double, 134 pm, 614 kJ/mol), which is in turn shorter and stronger than C-C (single, 154 pm, 348 kJ/mol).

### Network Covalent (Covalent Network) Solids

Not all covalent substances are molecular gases or liquids. In a **network covalent solid**, every atom is covalently bonded to its neighbors in one giant, continuous lattice — there's no separate "molecule" to point to. This gives them properties that look more like ionic compounds than like typical covalent molecules (e.g. CH₄ or CO₂):
- **Diamond** (pure carbon, every atom bonded to 4 neighbors): extremely hard, melting point over 3500°C, does not conduct electricity.
- **Quartz/silica, SiO₂** (every Si bonded to 4 O): very high melting point (1710°C), hard, used as the backbone of most rocks and sand.
- **Graphite** (carbon in flat, bonded sheets): high melting point along the sheets, but the sheets themselves are only held together by weak London dispersion forces — which is why graphite is soft and slippery even though the covalent bonds within a sheet are very strong.

## Covalent Bonds

Covalent bonds form when atoms **share** electrons.

### Types
- **Single Bond**: 1 shared pair (H—H)
- **Double Bond**: 2 shared pairs (O=O)
- **Triple Bond**: 3 shared pairs (N≡N)

### Polarity
- **Nonpolar**: Equal sharing (O₂, CH₄)
- **Polar**: Unequal sharing (H₂O, HCl)

## Metallic Bonding

The **"sea of electrons"** model explains metallic bonding:
- Metal atoms release valence electrons into a shared pool
- Explains high conductivity and malleability
- Alloys can be substitutional or interstitial
    `,
    quiz: [
      {
        question: "What happens during ionic bond formation?",
        options: ["Electrons are shared", "Electrons are transferred", "Protons are transferred", "Neutrons are shared"],
        correctAnswer: 1,
        explanation: "In ionic bonding, electrons are transferred from a metal to a nonmetal, creating oppositely charged ions that attract each other."
      },
      {
        question: "Which type of element typically loses electrons in ionic bonding?",
        options: ["Nonmetals", "Noble gases", "Metals", "Metalloids"],
        correctAnswer: 2,
        explanation: "Metals lose electrons to form positive cations. They have low electronegativity and few valence electrons."
      },
      {
        question: "What makes a covalent bond polar?",
        options: ["Equal sharing of electrons", "Unequal sharing of electrons", "Transfer of electrons", "Sharing of protons"],
        correctAnswer: 1,
        explanation: "A polar covalent bond has unequal sharing of electrons because one atom has higher electronegativity."
      },
      {
        question: "What explains the high conductivity of metals?",
        options: ["Crystal lattice", "Sea of delocalized electrons", "Ionic bonding", "Hydrogen bonding"],
        correctAnswer: 1,
        explanation: "In metallic bonding, electrons are delocalized across a 'sea' and can move freely, allowing metals to conduct electricity."
      }
    ]
  },
  {
    id: "lewis-structures",
    topicId: "chemical-bonding",
    title: "Lewis Structures",
    description: "Methodical approach to drawing valence electron arrangements",
    videoUrl: "https://www.youtube.com/embed/P1tki3oNWPQ",
    duration: "22 min",
    notes: `
# Lewis Structures

Lewis structures are the primary **visual language** for representing molecular structure.

## How to Draw Lewis Structures

### Step-by-Step Method
1. **Count total valence electrons** for all atoms
2. **Place the central atom** (usually the least electronegative)
3. **Draw single bonds** to surrounding atoms
4. **Distribute remaining electrons** as lone pairs on outer atoms
5. **Check octets** - form double/triple bonds if needed

### Example: Water (H₂O)
- Total valence electrons: 6 (O) + 1 + 1 (H×2) = 8
- O is central, bonded to 2 H atoms
- 2 lone pairs remain on O

## Formal Charge

Formal charge helps identify the **most favorable** Lewis structure.

**Formula**: FC = Valence e⁻ − Lone pair e⁻ − ½(Bonding e⁻)

### Rules
- Best structure has formal charges closest to zero
- Negative charges should be on more electronegative atoms

## Resonance Structures

When multiple valid Lewis structures can be drawn:
- The true structure is a **hybrid** of all resonance forms
- Electrons are **delocalized** across the molecule
- Example: Ozone (O₃) has two resonance structures

### Worked Example: The Nitrate Ion, NO₃⁻

1. **Count valence electrons**: N (5) + 3×O (6 each) + 1 (for the negative charge) = 5 + 18 + 1 = 24 electrons (12 pairs).
2. **Central atom**: N, bonded to all three O atoms by single bonds first (uses 6 electrons / 3 pairs).
3. **Remaining electrons**: 24 − 6 = 18 electrons go as lone pairs on the three O atoms (3 each) — but checking N's octet, it only has 6 electrons (3 bonds), one short.
4. **Fix the octet**: convert one O's lone pair into a second bond to N, forming one N=O double bond. Now N has a full octet (4 bonding pairs = 8 electrons).
5. Because any of the three oxygens could equally be the one with the double bond, there are **three equivalent resonance structures**. The real ion is an average of all three, with each N-O bond having a **bond order of 4/3** (one full bond's worth of electron density, shared unevenly by the "average" of one double + two single bonds across three positions) — this is why all three measured N-O bond lengths in NO₃⁻ are identical and intermediate between a single and a double bond, rather than one short (double) and two long (single) bonds as a single Lewis structure would suggest.

### Resonance and Bond Order

**Bond order** = (number of bonding electron pairs between two atoms), averaged across all resonance structures. A higher bond order means a shorter, stronger bond. For NO₃⁻: total bonding pairs across the three N-O positions = (1 double + 1 single + 1 single) summed across the three equivalent resonance structures and divided by 3 structures = 4 bonding-pair-equivalents ÷ 3 bonds = bond order **4/3 ≈ 1.33** for each N-O bond.

## Octet Rule Exceptions
- **Less than 8**: BF₃ (B has only 6)
- **More than 8**: SF₆ (S has 12) — expanded octet
- **Odd electrons**: NO (has 11 valence electrons)
    `,
    quiz: [
      {
        question: "What is the first step in drawing a Lewis structure?",
        options: ["Draw all bonds", "Count total valence electrons", "Place lone pairs", "Identify the central atom"],
        correctAnswer: 1,
        explanation: "The first step is always to count the total number of valence electrons from all atoms in the molecule."
      },
      {
        question: "What do resonance structures indicate?",
        options: ["The molecule is unstable", "Electrons are delocalized", "The molecule is ionic", "Bonds are all single"],
        correctAnswer: 1,
        explanation: "Resonance structures show that electrons are delocalized — the true structure is a hybrid of all possible resonance forms."
      },
      {
        question: "Which molecule violates the octet rule?",
        options: ["H₂O", "CO₂", "BF₃", "N₂"],
        correctAnswer: 2,
        explanation: "In BF₃, boron only has 6 electrons around it — an incomplete octet. This is an exception to the octet rule."
      },
      {
        question: "What does formal charge help determine?",
        options: ["Bond length", "Most favorable Lewis structure", "Molecular weight", "Boiling point"],
        correctAnswer: 1,
        explanation: "Formal charge helps identify the most stable Lewis structure by finding the arrangement with charges closest to zero."
      }
    ]
  },
  {
    id: "vsepr-theory",
    topicId: "chemical-bonding",
    title: "VSEPR Theory & Molecular Geometry",
    description: "Predicting 3D molecular shapes from electron domain repulsion",
    videoUrl: "https://www.youtube.com/embed/Q9-JjyAEqnU",
    duration: "7 min",
    notes: `
# VSEPR Theory & Molecular Geometry

**Valence Shell Electron Pair Repulsion (VSEPR)** theory predicts 3D molecular geometry.

## Core Principle

Electron groups (bonds and lone pairs) around a central atom **repel each other** and arrange to be as far apart as possible.

## Common Molecular Geometries

| Electron Domains | Lone Pairs | Shape | Bond Angle | Example |
|-----------------|------------|-------|------------|---------|
| 2 | 0 | Linear | 180° | CO₂ |
| 3 | 0 | Trigonal planar | 120° | BF₃ |
| 3 | 1 | Bent | ~117° | SO₂ |
| 4 | 0 | Tetrahedral | 109.5° | CH₄ |
| 4 | 1 | Trigonal pyramidal | ~107° | NH₃ |
| 4 | 2 | Bent | ~104.5° | H₂O |
| 5 | 0 | Trigonal bipyramidal | 90°/120° | PCl₅ |
| 6 | 0 | Octahedral | 90° | SF₆ |

::diagram:vsepr-shapes

## Hybridization

Atomic orbitals combine to form **hybrid orbitals** for bonding:

- **sp**: 2 hybrid orbitals → Linear (180°)
- **sp²**: 3 hybrid orbitals → Trigonal planar (120°)
- **sp³**: 4 hybrid orbitals → Tetrahedral (109.5°)
- **sp³d**: 5 hybrid orbitals → Trigonal bipyramidal
- **sp³d²**: 6 hybrid orbitals → Octahedral

::diagram:hybridisation

## Sigma and Pi Bonds

Every covalent bond you've drawn as a single line is actually a specific type of orbital overlap:
- **Sigma (σ) bond**: formed by *head-on* overlap of orbitals along the axis connecting the two nuclei. Every single bond is (at least) one σ bond, and it's the only bond present in a single bond. Atoms can rotate freely around a σ bond.
- **Pi (π) bond**: formed by *sideways* overlap of unhybridized p-orbitals, above and below the bond axis. A double bond = 1 σ + 1 π; a triple bond = 1 σ + 2 π. Because rotating around the bond axis would have to break the sideways p-orbital overlap, **rotation around a double or triple bond is restricted** — this is why cis/trans (E/Z) isomers exist for double bonds but not single bonds.

::diagram:sigma-pi-bonds

## A Glimpse of Molecular Orbital (MO) Theory

VSEPR and hybridization (valence bond theory) explain shape well, but they can't explain everything — most famously, they can't explain why **O₂ is attracted to a magnet** (paramagnetic). Molecular orbital theory instead combines the atomic orbitals of *both* atoms into new molecular orbitals that span the whole molecule: **bonding MOs** (lower energy, electrons here stabilize the molecule) and **antibonding MOs** (higher energy, electrons here destabilize it).

**Bond order (MO theory) = ½ × (electrons in bonding MOs − electrons in antibonding MOs)**

| Diatomic | Bond order | Notes |
|---|---|---|
| N₂ | 3 | Triple bond, no unpaired electrons — very stable, explains N₂'s inertness |
| O₂ | 2 | Double bond, but MO theory predicts **2 unpaired electrons** in antibonding orbitals — this correctly predicts O₂ is paramagnetic, which simple Lewis structures (all electrons paired) cannot explain |

## Bond Polarity & Molecular Dipoles

- **Electronegativity difference** creates bond dipoles — think of each polar bond as a small arrow (vector) pointing from the less electronegative atom toward the more electronegative one.
- Molecular polarity depends on **geometry** — symmetrical molecules can be nonpolar even with polar bonds, because the individual bond-dipole vectors add up (vector addition) to zero.
- **Example: CO₂ vs H₂O.** CO₂ is linear: the two C=O dipole vectors point in exactly opposite directions, so they cancel completely — net dipole moment = 0, nonpolar. H₂O is bent (~104.5°): the two O-H dipole vectors do *not* point in opposite directions, so they add up to a net dipole pointing away from the two H atoms — net dipole moment ≈ 1.85 D, polar.
- **Example: NH₃ vs BF₃.** Both have three polar bonds to the central atom, but NH₃ is trigonal pyramidal (due to a lone pair) — the three N-H dipoles don't cancel, and the lone pair itself contributes further asymmetry, so NH₃ is polar. BF₃ is trigonal planar with no lone pair — the three B-F dipoles, arranged symmetrically at 120° in a single plane, cancel exactly, so BF₃ is nonpolar.
    `,
    quiz: [
      {
        question: "What shape does a molecule with 4 electron domains and 0 lone pairs have?",
        options: ["Linear", "Trigonal planar", "Tetrahedral", "Octahedral"],
        correctAnswer: 2,
        explanation: "Four electron domains with no lone pairs gives a tetrahedral shape with 109.5° bond angles, like CH₄."
      },
      {
        question: "What is the hybridization of a carbon atom in CO₂?",
        options: ["sp", "sp²", "sp³", "sp³d"],
        correctAnswer: 0,
        explanation: "CO₂ has a linear geometry (2 electron domains), which corresponds to sp hybridization with 180° bond angles."
      },
      {
        question: "Why is CO₂ nonpolar despite having polar C=O bonds?",
        options: ["It has no lone pairs", "The bond dipoles cancel due to linear geometry", "Carbon is not electronegative", "Oxygen is too large"],
        correctAnswer: 1,
        explanation: "CO₂ is linear and symmetrical, so the two polar C=O bond dipoles point in opposite directions and cancel out."
      },
      {
        question: "How many lone pairs does water have on the central oxygen?",
        options: ["0", "1", "2", "3"],
        correctAnswer: 2,
        explanation: "Water has 2 bonding pairs and 2 lone pairs on oxygen, giving it a bent shape rather than linear."
      }
    ]
  },

  // ==============================
  // Unit 3: Intermolecular Forces
  // ==============================
  {
    id: "intermolecular-forces",
    topicId: "intermolecular-forces",
    title: "Intermolecular Forces",
    description: "How IMFs influence boiling points, vapor pressure, and viscosity",
    videoUrl: "https://www.youtube.com/embed/08kGgrqaZXA",
    duration: "11 min",
    notes: `
# Intermolecular Forces (IMFs)

While intramolecular forces hold atoms together within molecules, **intermolecular forces** act between molecules and determine macroscopic properties.

## Types of IMFs (Weakest to Strongest)

### 1. London Dispersion Forces (LDF)
- Present in **all** molecules
- Caused by temporary, instantaneous dipoles from electron movement
- Strength increases with **molecular size** (more electrons = stronger)
- Only force in nonpolar molecules (e.g., He, CH₄, I₂)

### 2. Dipole-Dipole Forces
- Between **polar** molecules
- Positive end of one molecule attracts negative end of another
- Stronger than LDF for molecules of similar size
- Example: HCl, CH₃Cl

### 3. Hydrogen Bonding
- Special, strong dipole-dipole force
- Requires: H bonded to **F, O, or N** (highly electronegative atoms)
- Explains water's unusually high boiling point
- Example: H₂O, NH₃, HF

::diagram:hydrogen-bonding

### 4. Ion-Dipole Forces
- Between an **ion** and a **polar molecule**
- Strongest IMF type
- Critical for dissolving ionic compounds in water

## IMFs and Physical Properties

| Property | Stronger IMFs → |
|----------|-----------------|
| Boiling point | Higher |
| Melting point | Higher |
| Vapor pressure | Lower |
| Viscosity | Higher |
| Surface tension | Higher |

## Vapor Pressure and Boiling

Molecules at a liquid's surface are constantly escaping into the gas phase (evaporating) and re-entering it (condensing). **Vapor pressure** is the pressure exerted by this escaped vapor once the two rates balance (a dynamic equilibrium), in a closed container at a given temperature.

- **Stronger IMFs → lower vapor pressure** (molecules are held in the liquid more tightly, so fewer escape at a given temperature).
- **Higher temperature → higher vapor pressure** (more molecules have enough kinetic energy to escape).
- A liquid **boils** when its vapor pressure rises to equal the surrounding atmospheric pressure — which is exactly why water boils at a lower temperature on a mountaintop (lower atmospheric pressure) than at sea level.

## Phase Changes & Energy

Heating curves show energy changes during phase transitions:

::diagram:heating-curve

- **Heat of fusion**: Energy for solid → liquid
- **Heat of vaporization**: Energy for liquid → gas
- Temperature stays **constant** during phase changes — all the energy added during a plateau goes into overcoming intermolecular forces (increasing potential energy), not into increasing average kinetic energy (temperature).

## Phase Diagrams

A **phase diagram** maps out which phase (solid, liquid or gas) is stable at every combination of pressure and temperature, and is read from two axes: pressure (y) and temperature (x).

- The three regions (solid, liquid, gas) are separated by boundary curves; crossing a curve corresponds to a phase change.
- The **triple point** is the single unique (T, P) combination where all three phases coexist in equilibrium simultaneously.
- The **critical point** is the (T, P) beyond which liquid and gas become indistinguishable — no amount of added pressure will condense the substance into a distinct liquid above the critical temperature.
- Water's phase diagram has an unusual negative-sloped solid-liquid boundary (most substances slope the other way), which is why applying pressure to ice can melt it at a temperature below 0°C — a direct consequence of solid water (ice) being *less* dense than liquid water.

## Solubility — "Like Dissolves Like"

Whether one substance dissolves in another comes down to whether the new solute-solvent intermolecular attractions are strong enough to make up for breaking the solute's own intermolecular forces and the solvent's own intermolecular forces.
- **Polar solvents** (like water) dissolve **polar and ionic solutes** well (strong dipole-dipole/ion-dipole attractions replace what was broken).
- **Nonpolar solvents** (like hexane) dissolve **nonpolar solutes** well (only need to overcome weak LDFs on both sides).
- Mixing a polar solvent with a nonpolar solute (e.g. trying to dissolve oil in water) fails, because the strong hydrogen bonds within water are not replaced by anything as strong with the nonpolar solute — oil and water don't mix.
    `,
    quiz: [
      {
        question: "Which type of IMF is present in ALL molecules?",
        options: ["Hydrogen bonding", "Dipole-dipole", "London dispersion forces", "Ion-dipole"],
        correctAnswer: 2,
        explanation: "London dispersion forces exist in all molecules — they arise from temporary fluctuations in electron density."
      },
      {
        question: "For hydrogen bonding to occur, hydrogen must be bonded to which atoms?",
        options: ["Any metal", "C, H, or O", "F, O, or N", "Any nonmetal"],
        correctAnswer: 2,
        explanation: "Hydrogen bonding requires H to be bonded to the highly electronegative atoms F, O, or N."
      },
      {
        question: "How do stronger IMFs affect boiling point?",
        options: ["Lower boiling point", "Higher boiling point", "No effect", "Boiling point becomes zero"],
        correctAnswer: 1,
        explanation: "Stronger IMFs require more energy to overcome, so more heat is needed to boil the substance — higher boiling point."
      },
      {
        question: "What is the strongest type of intermolecular force?",
        options: ["London dispersion", "Dipole-dipole", "Hydrogen bonding", "Ion-dipole"],
        correctAnswer: 3,
        explanation: "Ion-dipole forces are the strongest IMFs. They occur between ions and polar molecules, like NaCl dissolving in water."
      }
    ]
  },
  {
    id: "gas-laws",
    topicId: "intermolecular-forces",
    title: "Ideal Gas Law & Gas Properties",
    description: "Quantitative analysis of gas behavior using PV = nRT",
    videoUrl: "https://www.youtube.com/embed/WOEvvHbc240",
    duration: "9 min",
    notes: `
# Ideal Gas Law & Gas Properties

## Kinetic Molecular Theory (KMT)

The behavior of gases is explained by these postulates:
1. Gas particles are in **constant, random motion**
2. Particle volume is **negligible** compared to container volume
3. No attractive forces between particles
4. Collisions are perfectly **elastic** (no energy lost)
5. Average kinetic energy is proportional to **absolute temperature**

## The Ideal Gas Law

**PV = nRT**

| Variable | Meaning | Common Units |
|----------|---------|-------------|
| P | Pressure | atm, kPa, mmHg |
| V | Volume | L |
| n | Moles of gas | mol |
| R | Gas constant | 0.0821 L·atm/mol·K |
| T | Temperature | K (Kelvin) |

## Related Gas Laws

- **Boyle's Law**: P₁V₁ = P₂V₂ (constant T, n)
- **Charles's Law**: V₁/T₁ = V₂/T₂ (constant P, n)
- **Avogadro's Law**: V₁/n₁ = V₂/n₂ (constant T, P)
- **Dalton's Law**: P_total = P₁ + P₂ + P₃ + ...

::diagram:gas-law-graphs

### Worked Example: Partial Pressure from Mole Fraction

A 10.0 L flask at 25°C contains 2.0 mol N₂ and 1.0 mol O₂ at a total pressure of 7.33 atm. What is the partial pressure of O₂?

1. Mole fraction of O₂: x(O₂) = moles O₂ ÷ total moles = 1.0 ÷ (2.0 + 1.0) = 0.333
2. Partial pressure: P(O₂) = x(O₂) × P(total) = 0.333 × 7.33 atm = **2.44 atm**

(Notice this never needed the volume or temperature at all — partial pressure from mole fraction only needs the *ratio* of moles, and the total pressure.)

## Real Gases

Real gases deviate from ideal behavior when:
- **High pressure**: Particle volume matters
- **Low temperature**: Attractive forces become significant

The **Van der Waals equation** corrects for these deviations.

## Effusion and Diffusion

- **Diffusion**: Gas spreading through another gas
- **Effusion**: Gas escaping through a tiny hole
- **Graham's Law**: Rate ∝ 1/√(molar mass) — lighter gases move faster

### Worked Example: Comparing Effusion Rates

How much faster does H₂ (molar mass 2.0 g/mol) effuse than O₂ (molar mass 32.0 g/mol)?

Rate(H₂) / Rate(O₂) = √(molar mass of O₂ ÷ molar mass of H₂) = √(32.0 ÷ 2.0) = √16 = **4**

Hydrogen effuses **4 times faster** than oxygen — the lighter gas always wins, and the ratio only depends on the square root of the mass ratio, never on temperature or pressure.

## The Maxwell-Boltzmann Distribution

At any given temperature, gas molecules don't all move at the same speed — collisions constantly redistribute kinetic energy. Plotting the *fraction* of molecules against their kinetic energy gives a characteristic skewed curve:

::diagram:maxwell-boltzmann

- **Raising the temperature** shifts the whole curve right (higher average energy) and flattens/widens it (a broader spread of speeds) — total area under the curve stays the same (100% of molecules), but the peak drops as the distribution spreads out.
- This distribution is the deeper reason reaction rates increase so sharply with temperature (see the Kinetics unit): only molecules with energy above the activation energy, Eₐ, can react, and a small rise in temperature disproportionately increases the fraction of molecules in that high-energy tail.
    `,
    quiz: [
      {
        question: "What does 'n' represent in PV = nRT?",
        options: ["Number of particles", "Number of moles", "Neutrons", "Newton's constant"],
        correctAnswer: 1,
        explanation: "In the ideal gas law, n represents the number of moles of gas."
      },
      {
        question: "According to KMT, what is the average kinetic energy of gas particles proportional to?",
        options: ["Pressure", "Volume", "Absolute temperature", "Molar mass"],
        correctAnswer: 2,
        explanation: "Average kinetic energy is directly proportional to the absolute temperature (in Kelvin)."
      },
      {
        question: "When do real gases deviate most from ideal behavior?",
        options: ["High temperature, low pressure", "Low temperature, high pressure", "Room temperature", "In a vacuum"],
        correctAnswer: 1,
        explanation: "Real gases deviate at low temperature (attractive forces matter) and high pressure (particle volume matters)."
      },
      {
        question: "According to Graham's Law, which gas effuses fastest?",
        options: ["The heaviest", "The lightest", "The most polar", "The least reactive"],
        correctAnswer: 1,
        explanation: "Graham's Law states that lighter gases effuse faster — rate is inversely proportional to the square root of molar mass."
      }
    ]
  },

  // ==============================
  // Unit 4: Chemical Reactions & Stoichiometry
  // ==============================
  {
    id: "mole-concept",
    topicId: "stoichiometry",
    title: "The Mole Concept",
    description: "Comprehensive review of molar mass, Avogadro's number, and conversions",
    videoUrl: "https://www.youtube.com/embed/EowJsC7phzw",
    duration: "5 min",
    notes: `
# The Mole Concept

The **mole** is the chemist's counting unit — it bridges the gap between atoms and grams.

## Avogadro's Number

**1 mole = 6.022 × 10²³ particles**

This applies to atoms, molecules, ions, or formula units.

## Molar Mass

The mass (in grams) of one mole of a substance.
- Found on the periodic table as atomic mass
- Units: g/mol

### Examples
- Carbon: 12.01 g/mol
- Water (H₂O): 18.02 g/mol
- Glucose (C₆H₁₂O₆): 180.16 g/mol

## Conversion Map

**Particles ↔ Moles ↔ Grams**

### Moles to Grams
grams = moles × molar mass

### Grams to Moles
moles = grams ÷ molar mass

### Moles to Particles
particles = moles × 6.022 × 10²³

## Practice Problems

### Example 1
How many moles are in 36.04 g of water?
- Molar mass of H₂O = 18.02 g/mol
- 36.04 g ÷ 18.02 g/mol = **2.00 mol**

### Example 2
How many molecules are in 2.00 mol of H₂O?
- 2.00 × 6.022 × 10²³ = **1.204 × 10²⁴ molecules**

## Percent Composition

Mass percent of each element in a compound:
**% = (mass of element in 1 mol / molar mass of compound) × 100**

## Finding a Formula from Percent Composition

Percent composition data lets you work *backward* to a compound's formula — this is genuinely how unknown compounds get identified in the lab.

### Worked Example: Empirical Formula
A compound is 40.0% C, 6.7% H, and 53.3% O by mass. Find its empirical formula.

1. **Assume 100 g** of the compound, so the percentages become grams directly: 40.0 g C, 6.7 g H, 53.3 g O.
2. **Convert each to moles**: C = 40.0/12.01 = 3.33 mol; H = 6.7/1.01 = 6.63 mol; O = 53.3/16.00 = 3.33 mol.
3. **Divide every value by the smallest one** (3.33): C = 1.00, H = 1.99 ≈ 2, O = 1.00.
4. **Empirical formula: CH₂O** (ratio 1 : 2 : 1).

### From Empirical to Molecular Formula
The empirical formula gives only the *simplest* ratio — the real molecule could be a whole-number multiple of it. If you're also told the compound's molar mass is 180.16 g/mol:

1. Empirical formula mass of CH₂O = 12.01 + 2(1.01) + 16.00 = 30.03 g/mol.
2. Multiplier, n = 180.16 ÷ 30.03 ≈ **6**.
3. Molecular formula = (CH₂O) × 6 = **C₆H₁₂O₆** (glucose).

## Hydrate Formulas

Many ionic solids crystallize with a fixed number of water molecules trapped in the lattice — a **hydrate**, written with a centered dot, e.g. CuSO₄·5H₂O (copper(II) sulfate pentahydrate). Heating a hydrate drives off the water (leaving the "anhydrous" salt), and comparing the mass lost to the total mass tells you how many water molecules were present per formula unit — the same mole-ratio logic as any other formula problem, just treating "H₂O" as one of the "elements" being counted.
    `,
    quiz: [
      {
        question: "What is Avogadro's number?",
        options: ["6.022 × 10²⁰", "6.022 × 10²³", "3.14 × 10²³", "1.602 × 10⁻¹⁹"],
        correctAnswer: 1,
        explanation: "Avogadro's number is 6.022 × 10²³ — the number of particles in exactly one mole of a substance."
      },
      {
        question: "How many grams are in 3 moles of carbon (molar mass 12 g/mol)?",
        options: ["4 g", "12 g", "36 g", "15 g"],
        correctAnswer: 2,
        explanation: "Grams = moles × molar mass = 3 mol × 12 g/mol = 36 g."
      },
      {
        question: "What are the units of molar mass?",
        options: ["g", "mol", "g/mol", "mol/g"],
        correctAnswer: 2,
        explanation: "Molar mass is measured in grams per mole (g/mol). It tells you the mass of one mole of a substance."
      },
      {
        question: "What is the molar mass of H₂O?",
        options: ["16.00 g/mol", "17.01 g/mol", "18.02 g/mol", "20.00 g/mol"],
        correctAnswer: 2,
        explanation: "H₂O: 2(1.01) + 16.00 = 18.02 g/mol."
      }
    ]
  },
  {
    id: "balancing-equations",
    topicId: "stoichiometry",
    title: "Balancing Equations & Limiting Reactants",
    description: "Conservation of mass, mole ratios, and theoretical yield calculations",
    videoUrl: "https://www.youtube.com/embed/yA3TZJ2em6g",
    duration: "12 min",
    notes: `
# Balancing Equations & Limiting Reactants

## Balancing Chemical Equations

The **Law of Conservation of Mass** states that atoms cannot be created or destroyed in a chemical reaction.

### Steps to Balance
1. Write the unbalanced equation
2. Count atoms of each element on both sides
3. Add **coefficients** (not subscripts) to balance
4. Check that all elements are balanced

### Example
Unbalanced: H₂ + O₂ → H₂O
Balanced: **2H₂ + O₂ → 2H₂O**

## Stoichiometric Calculations

Balanced equations give us **mole ratios** for calculations.

### Mole-to-Mole
Using: 2H₂ + O₂ → 2H₂O
- 2 mol H₂ reacts with 1 mol O₂
- 2 mol H₂ produces 2 mol H₂O

## Limiting Reactant

The reactant that is **completely consumed** first — it determines the maximum product formed.

### How to Find It
1. Convert each reactant to moles of product
2. The reactant that produces **less** product is the limiting reactant
3. The other is the **excess reactant**

### Worked Example

For N₂(g) + 3H₂(g) → 2NH₃(g), you react 4.0 mol N₂ with 9.0 mol H₂. Which is limiting, and how much NH₃ forms?

1. **If N₂ were limiting**: 4.0 mol N₂ × (2 mol NH₃ / 1 mol N₂) = 8.0 mol NH₃ possible.
2. **If H₂ were limiting**: 9.0 mol H₂ × (2 mol NH₃ / 3 mol H₂) = 6.0 mol NH₃ possible.
3. **The smaller number wins** — H₂ produces less NH₃ (6.0 mol vs 8.0 mol), so **H₂ is the limiting reactant**, and the reaction can make at most **6.0 mol NH₃**.
4. **Leftover N₂**: the reaction actually used 9.0 mol H₂ × (1 mol N₂ / 3 mol H₂) = 3.0 mol N₂, so 4.0 − 3.0 = **1.0 mol N₂ remains unreacted** (the excess reactant).

## Solution Stoichiometry

When a reactant is given as a solution rather than a pure mass, convert **volume × molarity → moles** first, then proceed with the same mole-ratio method as any other stoichiometry problem.

**moles of solute = Molarity (mol/L) × Volume (L)**

**Example:** How many grams of AgCl precipitate when 50.0 mL of 0.200 M AgNO₃ reacts completely with excess NaCl (AgNO₃ + NaCl → AgCl + NaNO₃)?

1. moles AgNO₃ = 0.200 mol/L × 0.0500 L = 0.0100 mol
2. Mole ratio AgNO₃ : AgCl is 1 : 1, so moles AgCl = 0.0100 mol
3. mass AgCl = 0.0100 mol × 143.3 g/mol = **1.43 g**

## Yield Calculations

- **Theoretical yield**: Maximum product possible (from stoichiometry)
- **Actual yield**: What you actually get in the lab
- **Percent yield** = (actual / theoretical) × 100%

## Types of Reactions

| Type | General Form | Example |
|------|-------------|---------|
| Synthesis | A + B → AB | 2Na + Cl₂ → 2NaCl |
| Decomposition | AB → A + B | 2H₂O → 2H₂ + O₂ |
| Single replacement | A + BC → AC + B | Zn + CuSO₄ → ZnSO₄ + Cu |
| Double replacement | AB + CD → AD + CB | NaCl + AgNO₃ → AgCl + NaNO₃ |
| Combustion | CₓHᵧ + O₂ → CO₂ + H₂O | CH₄ + 2O₂ → CO₂ + 2H₂O |
    `,
    quiz: [
      {
        question: "What law requires chemical equations to be balanced?",
        options: ["Law of Thermodynamics", "Law of Conservation of Mass", "Avogadro's Law", "Hess's Law"],
        correctAnswer: 1,
        explanation: "The Law of Conservation of Mass states that matter is neither created nor destroyed — atoms must balance on both sides."
      },
      {
        question: "What is the limiting reactant?",
        options: ["The most expensive reactant", "The reactant in excess", "The reactant completely consumed first", "The catalyst"],
        correctAnswer: 2,
        explanation: "The limiting reactant runs out first, stopping the reaction and determining the maximum possible product."
      },
      {
        question: "If theoretical yield is 50 g and actual yield is 40 g, what is the percent yield?",
        options: ["125%", "80%", "90%", "40%"],
        correctAnswer: 1,
        explanation: "Percent yield = (actual/theoretical) × 100 = (40/50) × 100 = 80%."
      },
      {
        question: "In the reaction 2H₂ + O₂ → 2H₂O, what is the mole ratio of H₂ to O₂?",
        options: ["1:1", "2:1", "1:2", "2:2"],
        correctAnswer: 1,
        explanation: "From the balanced equation, 2 moles of H₂ react with 1 mole of O₂, giving a ratio of 2:1."
      }
    ]
  },
  {
    id: "redox-reactions",
    topicId: "stoichiometry",
    title: "Oxidation-Reduction Reactions",
    description: "Electron transfer reactions and oxidation number assignment",
    videoUrl: "https://www.youtube.com/embed/aMU1RaRulSo",
    duration: "13 min",
    notes: `
# Oxidation-Reduction (Redox) Reactions

Redox reactions involve the **transfer of electrons** between species.

## Key Definitions

- **Oxidation**: Loss of electrons (OIL — Oxidation Is Loss)
- **Reduction**: Gain of electrons (RIG — Reduction Is Gain)
- **Oxidizing agent**: Gains electrons (is reduced)
- **Reducing agent**: Loses electrons (is oxidized)

## Oxidation Numbers

Rules for assigning oxidation numbers:
1. Pure elements = **0**
2. Monatomic ions = charge of the ion
3. H = **+1** (except in metal hydrides: -1)
4. O = **-2** (except in peroxides: -1)
5. Sum of oxidation numbers = charge of species

## Identifying Redox Reactions

If oxidation numbers **change** during a reaction, it's a redox reaction.

### Example: Zinc and Copper Sulfate
Zn + CuSO₄ → ZnSO₄ + Cu

- Zn: 0 → +2 (oxidized, loses 2e⁻)
- Cu: +2 → 0 (reduced, gains 2e⁻)

::diagram:redox

## Balancing Redox in Acidic Solution
1. Split into half-reactions
2. Balance atoms other than O and H
3. Balance O with H₂O
4. Balance H with H⁺
5. Balance charge with e⁻
6. Multiply half-reactions so electrons cancel
7. Combine and simplify

## Balancing Redox in Basic Solution

Balance exactly as above for acidic solution first, then add one extra step: **add OH⁻ to both sides to cancel every H⁺** (since H⁺ can't coexist with a basic solution), turning each H⁺ + OH⁻ pair into H₂O, and simplifying any water that appears on both sides.

**Example:** balance MnO₄⁻ + I⁻ → MnO₂ + I₂ in basic solution.
1. Balance in acid first: 2MnO₄⁻ + 6H⁺ + 6I⁻ → 2MnO₂ + 3I₂ + 4H₂O... *(balancing atoms, charge and electrons as usual)*
2. Add 6 OH⁻ to both sides to cancel the 6 H⁺: 2MnO₄⁻ + 6H₂O + 6I⁻ → 2MnO₂ + 3I₂ + 4H₂O + 6OH⁻
3. Cancel the 4 H₂O that appear on both sides: **2MnO₄⁻ + 2H₂O + 6I⁻ → 2MnO₂ + 3I₂ + 6OH⁻**

## Disproportionation Reactions

A **disproportionation** reaction is a special redox reaction where a single element, in a single starting compound, is *simultaneously* oxidized and reduced — some of it goes up in oxidation number, some goes down.

**Example:** 2H₂O₂ → 2H₂O + O₂. Oxygen starts at −1 in H₂O₂ (an unusually unstable, intermediate oxidation state for oxygen), and ends up at −2 in H₂O (reduced) *and* at 0 in O₂ (oxidized) — the same element split into two different fates from the same reaction. This is exactly why hydrogen peroxide is not very stable and slowly decomposes even without added reactants.

## Net Ionic Equations

Remove spectator ions to show only the species that participate in the reaction.

## Where This Connects — Electrochemistry

Every redox reaction is, in principle, a source of usable electrical energy: physically separate the oxidation half-reaction from the reduction half-reaction (instead of letting the electrons transfer directly, as happens when you drop zinc straight into copper sulfate) and force the electrons to travel through an external wire instead. That's exactly how a battery works — see the Galvanic & Electrolytic Cells lesson in the Electrochemistry unit, which builds directly on the oxidation-number and half-reaction skills from this lesson.
    `,
    quiz: [
      {
        question: "What does oxidation involve?",
        options: ["Gain of electrons", "Loss of electrons", "Gain of protons", "Loss of neutrons"],
        correctAnswer: 1,
        explanation: "Oxidation Is Loss (OIL) — when a species is oxidized, it loses electrons."
      },
      {
        question: "What is the oxidation number of oxygen in most compounds?",
        options: ["+2", "-1", "-2", "0"],
        correctAnswer: 2,
        explanation: "Oxygen typically has an oxidation number of -2, except in peroxides (-1) and when it's a pure element (0)."
      },
      {
        question: "In a redox reaction, the reducing agent is the substance that:",
        options: ["Gains electrons", "Loses electrons", "Stays neutral", "Gains protons"],
        correctAnswer: 1,
        explanation: "The reducing agent loses electrons (is oxidized itself) while causing another substance to be reduced."
      },
      {
        question: "What is the oxidation number of any pure element?",
        options: ["+1", "-1", "0", "Depends on the element"],
        correctAnswer: 2,
        explanation: "Any element in its pure, uncombined form has an oxidation number of 0 (e.g., O₂, Na, Fe)."
      }
    ]
  },

  // ==============================
  // Unit 5: Kinetics
  // ==============================
  {
    id: "rate-laws",
    topicId: "kinetics",
    title: "Rate Laws & Reaction Rates",
    description: "How concentration affects reaction speed and determining rate constants",
    videoUrl: "https://www.youtube.com/embed/wYqQCojggyM",
    duration: "9 min",
    notes: `
# Rate Laws & Reaction Rates

Chemical kinetics studies **how fast** reactions occur and the molecular pathways (mechanisms) by which they happen.

## Factors Affecting Reaction Rate

1. **Concentration** of reactants (higher = faster)
2. **Temperature** (higher = faster)
3. **Surface area** of solids (more = faster)
4. **Catalysts** (lower activation energy)

## Collision Theory

For a reaction to occur, particles must:
1. **Collide** with each other
2. Have sufficient **energy** (≥ activation energy, Ea)
3. Have proper **orientation**

## Rate Laws

**Rate = k[A]ᵐ[B]ⁿ**

- k = rate constant
- [A], [B] = concentrations of reactants
- m, n = reaction orders (found experimentally)

### Reaction Orders
| Order | Rate Law | [A] vs Time | Half-life |
|-------|----------|-------------|-----------|
| 0 | Rate = k | Linear | t₁/₂ = [A]₀/2k |
| 1 | Rate = k[A] | Exponential decay | t₁/₂ = 0.693/k |
| 2 | Rate = k[A]² | Curved | t₁/₂ = 1/k[A]₀ |

## Integrated Rate Laws

Allow calculation of concentration as a function of time:
- **Zero order**: [A] = [A]₀ - kt
- **First order**: ln[A] = ln[A]₀ - kt
- **Second order**: 1/[A] = 1/[A]₀ + kt

### The Graphical Method for Finding Reaction Order

Each integrated rate law is secretly a "y = mx + b" straight line *if you plot the right thing* — this is the standard AP technique for finding the order of a reaction from concentration-vs-time data, without ever needing to guess:

| Plot this... | ...against time | If it's a straight line, the reaction is |
|---|---|---|
| [A] | t | Zero order (slope = −k) |
| ln[A] | t | First order (slope = −k) |
| 1/[A] | t | Second order (slope = +k) |

Try plotting your data all three ways — whichever one comes out as a straight line tells you the order, and its slope hands you the rate constant k directly.

::diagram:reaction-order-graphs

## Determining a Rate Law from Experimental Data (Method of Initial Rates)

Given a table of initial concentrations and the initial rate measured for each, find the order with respect to each reactant by comparing trials where only *one* concentration changes at a time.

**Worked example** for A + B → products, rate = k[A]ᵘ[B]ᵛ:

| Trial | [A] (M) | [B] (M) | Initial rate (M/s) |
|---|---|---|---|
| 1 | 0.10 | 0.10 | 2.0 × 10⁻³ |
| 2 | 0.20 | 0.10 | 8.0 × 10⁻³ |
| 3 | 0.20 | 0.20 | 1.6 × 10⁻² |

1. **Find order in A** using trials 1 and 2 (B held constant): [A] doubled, rate went from 2.0 to 8.0 × 10⁻³ — a 4× increase. Since 2ᵘ = 4, **u = 2** (second order in A).
2. **Find order in B** using trials 2 and 3 (A held constant): [B] doubled, rate went from 8.0 to 16.0 × 10⁻³ — a 2× increase. Since 2ᵛ = 2, **v = 1** (first order in B).
3. **Overall rate law: rate = k[A]²[B]** (third order overall).
4. **Solve for k** using trial 1: 2.0 × 10⁻³ = k(0.10)²(0.10) → k = 2.0 × 10⁻³ ÷ 1.0 × 10⁻³ = **2.0 M⁻²s⁻¹**.

## Arrhenius Equation

**k = Ae^(-Ea/RT)**

Relates the rate constant to temperature and activation energy.

### The Arrhenius Plot — Finding Eₐ Graphically

Taking the natural log of both sides turns the Arrhenius equation into a straight line too:

**ln k = ln A − (Eₐ/R)(1/T)**

Plotting ln k (y-axis) against 1/T (x-axis) gives a straight line with **slope = −Eₐ/R**. Measure the rate constant k at several different temperatures, make this plot, and the slope directly hands you the activation energy — this is how activation energies are actually measured in a lab, since Eₐ can't be read off a single rate measurement at one temperature.
    `,
    quiz: [
      {
        question: "What must particles have for a successful collision?",
        options: ["High mass", "Sufficient energy and proper orientation", "Low temperature", "Same charge"],
        correctAnswer: 1,
        explanation: "According to collision theory, reactant particles must collide with enough energy (≥ Ea) and correct orientation."
      },
      {
        question: "The half-life of a first-order reaction depends on:",
        options: ["Initial concentration", "Temperature only", "Only the rate constant k", "Volume"],
        correctAnswer: 2,
        explanation: "For first-order reactions, t₁/₂ = 0.693/k — it depends only on k, not on initial concentration."
      },
      {
        question: "What does a catalyst do?",
        options: ["Increases temperature", "Lowers activation energy", "Adds more reactant", "Changes products"],
        correctAnswer: 1,
        explanation: "A catalyst lowers the activation energy barrier, allowing more collisions to be successful without being consumed."
      },
      {
        question: "How are reaction orders determined?",
        options: ["From the balanced equation", "Experimentally from rate data", "By counting atoms", "From molecular mass"],
        correctAnswer: 1,
        explanation: "Reaction orders are determined experimentally — you cannot simply read them from balanced equation coefficients."
      }
    ]
  },
  {
    id: "reaction-mechanisms",
    topicId: "kinetics",
    title: "Reaction Mechanisms & Catalysis",
    description: "Elementary steps, intermediates, and the rate-determining step",
    videoUrl: "https://www.youtube.com/embed/TtOXKhHjhis",
    duration: "13 min",
    notes: `
# Reaction Mechanisms & Catalysis

## What is a Mechanism?

A reaction mechanism is the **step-by-step sequence** of elementary reactions that make up an overall reaction.

## Key Terms

- **Elementary step**: A single molecular event (one collision)
- **Intermediate**: A species produced in one step and consumed in another
- **Rate-determining step (RDS)**: The slowest step — controls the overall rate
- **Catalyst**: A species that speeds up the reaction without being consumed

## Rules for Valid Mechanisms

1. Elementary steps must **add up** to the overall reaction
2. The rate law from the mechanism must **match** the experimental rate law
3. The rate law is determined by the **rate-determining step**

## Example Mechanism

Overall: 2NO₂ + F₂ → 2NO₂F

Step 1 (slow): NO₂ + F₂ → NO₂F + F
Step 2 (fast): NO₂ + F → NO₂F

- Intermediate: F (produced in step 1, consumed in step 2)
- Rate law: Rate = k[NO₂][F₂] (from the slow step)

## Types of Catalysis

### Homogeneous Catalysis
- Catalyst is in the **same phase** as reactants
- Example: Acid catalysis in solution

### Heterogeneous Catalysis
- Catalyst is in a **different phase** (usually solid surface)
- Example: Catalytic converter in cars

### Enzyme Catalysis
- Biological catalysts (proteins)
- Extremely specific and efficient
- Lock-and-key model

## Energy Diagrams

A multi-step mechanism shows **multiple peaks** on an energy diagram:

::diagram:mechanism-energy-diagram

- Each peak = activation energy for one step
- Valleys between peaks = intermediates
- Highest peak = rate-determining step

## The Pre-Equilibrium Approximation

Sometimes the rate-determining step uses an intermediate that is itself produced by a **fast, reversible** first step — and that intermediate's concentration depends on an equilibrium, not a simple forward rate. This situation needs a slightly different derivation than a simple slow-first-step mechanism.

**Example mechanism:**
- Step 1 (fast, reversible): A + B ⇌ C (forward rate constant k₁, reverse rate constant k₋₁)
- Step 2 (slow, RDS): C + D → products (rate constant k₂)

Since step 1 is fast and reversible, it reaches equilibrium essentially instantly compared to the slow step 2, so the forward and reverse rates of step 1 are equal: k₁[A][B] = k₋₁[C]. Solving for the intermediate's concentration: **[C] = (k₁/k₋₁)[A][B]**.

Substituting this into the rate law for the slow step (rate = k₂[C][D]) eliminates the hard-to-measure intermediate C and gives the overall rate law entirely in terms of the original reactants:

**Rate = (k₂k₁/k₋₁)[A][B][D]**

This technique — using a fast pre-equilibrium to substitute away an intermediate — is one of the more advanced mechanism-analysis skills, but it comes up whenever the rate-determining step isn't simply the *first* step.
    `,
    quiz: [
      {
        question: "What is the rate-determining step?",
        options: ["The fastest step", "The slowest step", "The first step", "The last step"],
        correctAnswer: 1,
        explanation: "The rate-determining step is the slowest step in the mechanism — it acts as a bottleneck and controls the overall rate."
      },
      {
        question: "What is an intermediate in a reaction mechanism?",
        options: ["A catalyst", "A spectator ion", "A species produced in one step and consumed in another", "A final product"],
        correctAnswer: 2,
        explanation: "An intermediate is formed during one elementary step and then used up in a subsequent step — it doesn't appear in the overall equation."
      },
      {
        question: "In heterogeneous catalysis, the catalyst is:",
        options: ["In the same phase as reactants", "In a different phase from reactants", "Always a gas", "Always an enzyme"],
        correctAnswer: 1,
        explanation: "Heterogeneous catalysis involves a catalyst in a different phase — commonly a solid surface catalyzing gas or liquid reactions."
      },
      {
        question: "For a valid mechanism, elementary steps must:",
        options: ["All be fast", "All be slow", "Add up to the overall reaction", "Have the same rate law"],
        correctAnswer: 2,
        explanation: "The sum of all elementary steps must give the overall balanced equation for the mechanism to be valid."
      }
    ]
  },

  // ==============================
  // Unit 6: Thermodynamics
  // ==============================
  {
    id: "calorimetry",
    topicId: "thermodynamics",
    title: "Calorimetry & Enthalpy",
    description: "Practical methods for calculating heat transfer and specific heat capacity",
    videoUrl: "https://www.youtube.com/embed/lu4nQHFmh0A",
    duration: "14 min",
    notes: `
# Calorimetry & Enthalpy

## Enthalpy (ΔH)

Enthalpy measures the **heat content** of a system at constant pressure.

- **Exothermic** (ΔH < 0): Releases heat to surroundings
- **Endothermic** (ΔH > 0): Absorbs heat from surroundings

::diagram:energy-diagram

## Calorimetry

Measuring heat changes through temperature shifts.

### Heat Equation
**q = mcΔT**

| Variable | Meaning | Units |
|----------|---------|-------|
| q | Heat transferred | J or kJ |
| m | Mass of substance | g |
| c | Specific heat capacity | J/(g·°C) |
| ΔT | Temperature change | °C or K |

### Specific Heat of Water
c = 4.184 J/(g·°C) — water has an unusually high specific heat!

### Coffee Cup Calorimeter
- Measures heat at constant pressure
- qsolution = -qreaction (heat lost by reaction = heat gained by solution)

### Bomb Calorimeter
- Measures heat at constant volume
- Used for combustion reactions
- q = CcalΔT (where Ccal is calorimeter constant)

### Worked Example: Coffee-Cup Calorimetry

50.0 g of water at 25.0°C is mixed with a dissolving salt in a coffee-cup calorimeter, and the temperature drops to 21.5°C. How much heat was absorbed by the dissolving process?

1. ΔT = 21.5 − 25.0 = −3.5°C
2. q(water) = mcΔT = (50.0 g)(4.184 J/g·°C)(−3.5°C) = **−732 J**
3. By conservation of energy, q(solution) = −q(reaction): the water *lost* 732 J, so the dissolving process *absorbed* **+732 J** — it's endothermic, consistent with the temperature drop you'd feel if you touched the cup.

### Heat (Enthalpy) of Solution

When an ionic solid dissolves in water, two things happen with opposite energy signs: breaking the ionic lattice apart costs energy (endothermic, equal to the lattice energy), while the freed ions being surrounded and stabilized by water molecules (**hydration**) releases energy (exothermic). The overall **enthalpy of solution** is whichever of these two effects wins:
- If |hydration energy| > |lattice energy|: dissolving is **exothermic** overall (e.g. CaCl₂ dissolving, which is why instant hot packs use it).
- If |lattice energy| > |hydration energy|: dissolving is **endothermic** overall (e.g. NH₄NO₃ dissolving, which is why instant cold packs use it).

## Hess's Law

If a reaction can be carried out in a series of steps, the **ΔH for the overall reaction** equals the sum of ΔH for individual steps.

### Why It Works
Enthalpy is a **state function** — it depends only on initial and final states, not the path taken.

### Using Hess's Law
1. Arrange given reactions so they add up to the target
2. Reverse reactions: change sign of ΔH
3. Multiply reactions: multiply ΔH by the same factor
4. Add all ΔH values
    `,
    quiz: [
      {
        question: "An exothermic reaction has a ΔH that is:",
        options: ["Positive", "Negative", "Zero", "Undefined"],
        correctAnswer: 1,
        explanation: "Exothermic reactions release heat, so the system loses energy. ΔH is negative."
      },
      {
        question: "In the equation q = mcΔT, what does 'c' represent?",
        options: ["Concentration", "Speed of light", "Specific heat capacity", "Celsius temperature"],
        correctAnswer: 2,
        explanation: "c is the specific heat capacity — the amount of heat needed to raise 1 gram of a substance by 1°C."
      },
      {
        question: "Why does Hess's Law work?",
        options: ["Energy can be created", "Enthalpy is a state function", "All reactions are reversible", "Temperature is constant"],
        correctAnswer: 1,
        explanation: "Hess's Law works because enthalpy is a state function — it only depends on the initial and final states, not the path."
      },
      {
        question: "What does the specific heat capacity of water (4.184 J/g·°C) tell us?",
        options: ["Water boils easily", "Water heats up slowly relative to other substances", "Water is a gas", "Water freezes at 0°C"],
        correctAnswer: 1,
        explanation: "Water's high specific heat means it absorbs a lot of energy for a small temperature change, which is why it heats up slowly."
      }
    ]
  },
  {
    id: "hess-law-bond-energies",
    topicId: "thermodynamics",
    title: "Hess's Law & Bond Enthalpies",
    description: "Using multiple reactions to find unknown enthalpy changes",
    videoUrl: "https://www.youtube.com/embed/iETCSFit-zA",
    duration: "11 min",
    notes: `
# Hess's Law & Bond Enthalpies

## Hess's Law in Practice

### Standard Enthalpy of Formation (ΔHf°)

The enthalpy change when **1 mole** of a compound is formed from its elements in their **standard states**.

**ΔH°rxn = Σ ΔHf°(products) - Σ ΔHf°(reactants)**

### Standard States
- Gases: 1 atm pressure
- Solutions: 1 M concentration
- Temperature: 25°C (298 K)
- Elements in most stable form: ΔHf° = 0

## Bond Enthalpies

### Breaking Bonds = Endothermic (requires energy)
### Forming Bonds = Exothermic (releases energy)

**ΔH = Σ(bonds broken) - Σ(bonds formed)**

### Common Bond Energies
| Bond | Energy (kJ/mol) |
|------|-----------------|
| C-H | 413 |
| C-C | 348 |
| C=C | 614 |
| O-H | 463 |
| O=O | 495 |
| C=O | 799 |
| N≡N | 941 |

### Example: Combustion of Methane
CH₄ + 2O₂ → CO₂ + 2H₂O

Bonds broken: 4(C-H) + 2(O=O) = 4(413) + 2(495) = 2642 kJ
Bonds formed: 2(C=O) + 4(O-H) = 2(799) + 4(463) = 3450 kJ

ΔH = 2642 - 3450 = **-808 kJ** (exothermic!)

## Phase Change Energies
- **Heat of fusion (ΔHfus)**: Solid → Liquid
- **Heat of vaporization (ΔHvap)**: Liquid → Gas
- Temperature stays constant during phase changes

## The Born-Haber Cycle — Hess's Law Applied to Ionic Solids

The **Born-Haber cycle** is a specific, famous application of Hess's Law used to find (or verify) the lattice energy of an ionic compound, by relating it to a closed loop of other measurable enthalpies: the enthalpy of formation of the compound, the enthalpy of sublimation of the metal, the bond dissociation enthalpy of the nonmetal, the metal's ionization energy, and the nonmetal's electron affinity. Since enthalpy is a state function, the sum of every step around the loop must equal the direct enthalpy of formation — so if all the other four quantities are known, the lattice energy is simply whatever value makes the loop add up to zero.

## Looking Ahead: Enthalpy Is Only Half the Story

Knowing ΔH tells you whether a reaction releases or absorbs heat, but it does **not** by itself tell you whether a reaction will happen spontaneously — plenty of endothermic processes (like ice melting above 0°C) still happen on their own. The missing piece is **entropy**, and the two combine into **Gibbs free energy** (ΔG = ΔH − TΔS), covered in the Entropy & Gibbs Free Energy lesson in the Electrochemistry unit — that's where "will this reaction actually happen?" finally gets a complete answer.
    `,
    quiz: [
      {
        question: "The standard enthalpy of formation of a pure element in its standard state is:",
        options: ["Positive", "Negative", "Zero", "Variable"],
        correctAnswer: 2,
        explanation: "By definition, the standard enthalpy of formation of any element in its standard state is zero."
      },
      {
        question: "Breaking bonds is always:",
        options: ["Exothermic", "Endothermic", "Spontaneous", "Impossible"],
        correctAnswer: 1,
        explanation: "Breaking bonds always requires energy input (endothermic). Forming bonds releases energy (exothermic)."
      },
      {
        question: "Using bond enthalpies, ΔH is calculated as:",
        options: ["Bonds formed - bonds broken", "Bonds broken - bonds formed", "Bonds broken × bonds formed", "Bonds broken + bonds formed"],
        correctAnswer: 1,
        explanation: "ΔH = Σ(energy of bonds broken) - Σ(energy of bonds formed). Positive = endothermic, negative = exothermic."
      },
      {
        question: "During a phase change, what happens to temperature?",
        options: ["It increases", "It decreases", "It stays constant", "It fluctuates"],
        correctAnswer: 2,
        explanation: "During phase changes, temperature remains constant — all energy goes into overcoming intermolecular forces."
      }
    ]
  },

  // ==============================
  // Unit 7: Equilibrium
  // ==============================
  {
    id: "equilibrium-constant",
    topicId: "equilibrium",
    title: "Equilibrium & Le Chatelier's Principle",
    description: "Understanding Keq, Q, and how systems respond to stress",
    videoUrl: "https://www.youtube.com/embed/SaDALOInzac",
    duration: "19 min",
    notes: `
# Equilibrium & Le Chatelier's Principle

## What is Equilibrium?

Equilibrium is reached when the **forward and reverse reactions occur at equal rates**, resulting in no net change in concentrations.

## Equilibrium Constant (K)

For the reaction: aA + bB ⇌ cC + dD

**K = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ**

::diagram:equilibrium-graph

### Interpreting K
- **K >> 1**: Product-favored (mostly products at equilibrium)
- **K << 1**: Reactant-favored (mostly reactants at equilibrium)
- **K ≈ 1**: Significant amounts of both

### Important Notes
- K only includes **gases** and **aqueous** species
- Pure solids and pure liquids are **excluded**
- K changes only with **temperature**

## Reaction Quotient (Q)

Q has the same formula as K but uses **current** concentrations (not equilibrium).

### Comparing Q and K
- **Q < K**: Reaction shifts → **right** (toward products)
- **Q > K**: Reaction shifts → **left** (toward reactants)
- **Q = K**: System is at equilibrium

## Le Chatelier's Principle

When a stress is applied to a system at equilibrium, the system **shifts to minimize that stress**.

### Types of Stress
| Stress | Shift Direction | Effect on K |
|--------|----------------|-------------|
| Add reactant | → Right | No change |
| Add product | ← Left | No change |
| Increase pressure | Toward fewer moles of gas | No change |
| Increase temperature (exo) | ← Left | K decreases |
| Increase temperature (endo) | → Right | K increases |
| Add catalyst | No shift | No change |

## Setting Up and Solving an ICE Table

This is the single most heavily tested equilibrium skill: given starting concentrations and either K or the equilibrium concentration of one species, find everything else at equilibrium.

**Worked example:** 1.00 mol of H₂ and 1.00 mol of I₂ are placed in a 1.00 L flask and allowed to reach equilibrium: H₂(g) + I₂(g) ⇌ 2HI(g), Kc = 54.3 at this temperature. Find all equilibrium concentrations.

| | H₂ | I₂ | HI |
|---|---|---|---|
| **I**nitial | 1.00 | 1.00 | 0 |
| **C**hange | −x | −x | +2x |
| **E**quilibrium | 1.00 − x | 1.00 − x | 2x |

1. Substitute the equilibrium row into the Kc expression: Kc = [HI]² ÷ ([H₂][I₂]) = (2x)² ÷ (1.00 − x)² = 54.3
2. Since both sides are perfect squares here, take the square root of both sides: 2x ÷ (1.00 − x) = √54.3 = 7.37
3. Solve for x: 2x = 7.37(1.00 − x) → 2x = 7.37 − 7.37x → 9.37x = 7.37 → **x = 0.787**
4. Equilibrium concentrations: [H₂] = [I₂] = 1.00 − 0.787 = **0.213 M**; [HI] = 2(0.787) = **1.574 M**

(Most ICE-table problems don't simplify to a perfect square this cleanly — many require the quadratic formula, or, if K is very small, the approximation that x is negligible compared to the initial concentration.)

## The Common-Ion Effect

Adding an ion to a solution that is **already part of an existing equilibrium** shifts that equilibrium away from producing more of that same ion (Le Chatelier's principle in action). This is called the **common-ion effect**, and it shows up constantly in both weak-acid and solubility equilibria.

**Example:** acetic acid ionizes as CH₃COOH ⇌ H⁺ + CH₃COO⁻. Adding sodium acetate (CH₃COONa, a strong electrolyte that fully dissociates) floods the solution with extra CH₃COO⁻ — the *same* ion already on the product side of the acetic acid equilibrium. The equilibrium shifts left to partially counteract this, suppressing the acid's own ionization and lowering [H⁺] (raising the pH) compared to acetic acid alone at the same concentration.

## Kc vs. Kp — Converting Between Them

For reactions involving gases, the equilibrium constant can be written either in terms of concentrations (Kc) or partial pressures (Kp). They're related by:

**Kp = Kc(RT)^Δn**

where Δn = (moles of gaseous products) − (moles of gaseous reactants) in the balanced equation, R = 0.0821 L·atm/(mol·K), and T is in Kelvin. If Δn = 0 (equal moles of gas on both sides), Kp = Kc exactly.

## Solubility Product (Ksp)

For sparingly soluble salts:
- Ksp = product of ion concentrations raised to their stoichiometric powers
- If Q > Ksp: precipitate forms
- If Q < Ksp: more can dissolve
    `,
    quiz: [
      {
        question: "At equilibrium, the forward and reverse reaction rates are:",
        options: ["Both zero", "Equal", "The forward is faster", "The reverse is faster"],
        correctAnswer: 1,
        explanation: "At equilibrium, both rates are equal — the system is dynamic, with reactions still occurring in both directions."
      },
      {
        question: "If Q < K, which direction will the reaction shift?",
        options: ["Left (toward reactants)", "Right (toward products)", "No shift", "Depends on temperature"],
        correctAnswer: 1,
        explanation: "When Q < K, the system needs to make more products to reach equilibrium, so it shifts right."
      },
      {
        question: "Adding a catalyst to a system at equilibrium will:",
        options: ["Shift toward products", "Shift toward reactants", "Not change the equilibrium position", "Change K"],
        correctAnswer: 2,
        explanation: "A catalyst speeds up both forward and reverse reactions equally — it doesn't change K or the equilibrium position."
      },
      {
        question: "What does a large K value indicate?",
        options: ["Mostly reactants", "Mostly products", "Equal amounts", "Reaction doesn't occur"],
        correctAnswer: 1,
        explanation: "A large K (>> 1) means the equilibrium lies far to the right — the products are strongly favored."
      }
    ]
  },

  // ==============================
  // Unit 8: Acids and Bases
  // ==============================
  {
    id: "ph-acids-bases",
    topicId: "acids-bases",
    title: "pH, Strong & Weak Acids and Bases",
    description: "pH/pOH scales, Ka/Kb, and proton transfer reactions",
    videoUrl: "https://www.youtube.com/embed/0u7pPQ29qjc",
    duration: "50 min",
    notes: `
# pH, Strong & Weak Acids and Bases

## Brønsted-Lowry Definition

- **Acid**: Proton (H⁺) donor
- **Base**: Proton (H⁺) acceptor
- Every acid-base reaction involves a **conjugate pair**

## The pH Scale

**pH = -log[H⁺]**

| pH | Description | Example |
|----|------|---------|
| 0-3 | Strongly acidic | HCl, gastric acid, vinegar |
| 4-6 | Mildly acidic | Black coffee, tomato juice |
| 7 | Neutral | Pure water |
| 8-10 | Mildly basic | Baking soda, seawater |
| 11-14 | Strongly basic | NaOH, KOH, ammonia |

> **pH is not the same as acid/base "strength."** Strength describes how completely an acid or base ionizes in water (its Kₐ or K_b), while pH describes the actual [H⁺] of a particular solution. A weak acid like vinegar (acetic acid) only partially ionizes, yet a typical vinegar solution still sits around pH 2.5-3.5 because it's fairly concentrated — so it appears in the "strongly acidic" pH range above even though it's chemically a weak acid.

### Key Relationships
- pH + pOH = 14
- [H⁺][OH⁻] = Kw = 1.0 × 10⁻¹⁴ (at 25°C)
- pOH = -log[OH⁻]

## Strong vs. Weak Acids

### Strong Acids (100% ionization)
- HCl, HBr, HI, HNO₃, H₂SO₄, HClO₄
- [H⁺] = initial acid concentration

### Weak Acids (partial ionization)
- Establish equilibrium: HA ⇌ H⁺ + A⁻
- **Ka = [H⁺][A⁻] / [HA]**
- Larger Ka = stronger weak acid
- pKa = -log(Ka)

### Strong Bases
- NaOH, KOH, Ca(OH)₂
- [OH⁻] = initial base concentration

### Weak Bases
- NH₃, amines
- **Kb = [BH⁺][OH⁻] / [B]**
- Ka × Kb = Kw

## Auto-ionization of Water
H₂O ⇌ H⁺ + OH⁻
Kw = 1.0 × 10⁻¹⁴ at 25°C

## Worked Example: Finding the pH of a Weak Acid

Find the pH of 0.100 M acetic acid (Ka = 1.8 × 10⁻⁵).

1. Set up the equilibrium and an ICE table for CH₃COOH ⇌ H⁺ + CH₃COO⁻, starting at 0.100 M and changing by −x/+x/+x.
2. Ka = x² ÷ (0.100 − x) = 1.8 × 10⁻⁵
3. **Approximation method**: since Ka is tiny, assume x is negligible compared to 0.100 (x << 0.100), simplifying the denominator to just 0.100: x² = (1.8 × 10⁻⁵)(0.100) = 1.8 × 10⁻⁶ → x = √(1.8 × 10⁻⁶) = 1.34 × 10⁻³ M.
4. **Check the approximation**: x ÷ 0.100 = 1.34% — well under the usual 5% cutoff, so the approximation is valid and there's no need to solve the full quadratic.
5. [H⁺] = 1.34 × 10⁻³ M, so pH = −log₁₀(1.34 × 10⁻³) = **2.87**.

(If the 5% check *fails* — typically for more concentrated Ka values or more dilute solutions — you cannot simplify away the "− x" and must solve the full quadratic equation x² + Kax − Ka(C₀) = 0 using the quadratic formula instead.)

## Percent Ionization

**Percent ionization = ([H⁺] at equilibrium ÷ initial concentration of acid) × 100**

For the example above: (1.34 × 10⁻³ ÷ 0.100) × 100 = **1.34%** ionized — confirming acetic acid is indeed a *weak* acid at this concentration (compare to a strong acid, which is 100% ionized). An important, slightly counterintuitive result: **percent ionization increases as a weak acid is diluted** (even though [H⁺] itself decreases), because Le Chatelier's principle shifts the ionization equilibrium forward as concentration drops.

## Polyprotic Acids

A **polyprotic acid** can donate more than one proton, one at a time, each with its own (progressively smaller) Ka. Sulfuric acid, H₂SO₄, donates its first proton essentially completely (it's a strong acid for the first ionization) but its second ionization, HSO₄⁻ ⇌ H⁺ + SO₄²⁻, is that of a weak acid with its own Ka₂. Phosphoric acid, H₃PO₄, has three successive ionizations (Ka₁, Ka₂, Ka₃), each roughly 10³-10⁵ times smaller than the one before — removing a proton from an already-negative ion is always harder than from a neutral molecule, since the departing H⁺ is attracted back by the growing negative charge.

In almost every polyprotic acid calculation, **only the first ionization contributes meaningfully to [H⁺]** — Ka₂ and beyond are so much smaller that their contribution is negligible by comparison.

## Amphoteric Species

A species that can act as *either* an acid or a base, depending on what it reacts with, is called **amphoteric** (or amphiprotic, for species that specifically donate/accept protons). The intermediate ion of any polyprotic acid is a classic example: HSO₄⁻ can donate a proton (acting as an acid, → SO₄²⁻) or accept one (acting as a base, → H₂SO₄). Water itself is the most important amphoteric substance in chemistry — it's what makes its own auto-ionization (H₂O + H₂O ⇌ H₃O⁺ + OH⁻) possible, with one water molecule acting as the acid and the other as the base.
    `,
    quiz: [
      {
        question: "A solution with pH 3 is:",
        options: ["Strongly basic", "Neutral", "Weakly basic", "Acidic"],
        correctAnswer: 3,
        explanation: "pH values below 7 are acidic. pH 3 is quite acidic — about the acidity of vinegar."
      },
      {
        question: "What is the relationship between pH and pOH at 25°C?",
        options: ["pH × pOH = 14", "pH + pOH = 14", "pH - pOH = 14", "pH / pOH = 14"],
        correctAnswer: 1,
        explanation: "At 25°C, pH + pOH = 14. This comes from the relationship Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴."
      },
      {
        question: "Strong acids differ from weak acids because they:",
        options: ["Are more concentrated", "Ionize 100% in water", "Have higher pH", "Are always dangerous"],
        correctAnswer: 1,
        explanation: "Strong acids completely dissociate (100% ionization) in water, while weak acids only partially ionize."
      },
      {
        question: "What does Ka measure?",
        options: ["Speed of a reaction", "Strength of a weak acid", "pH of a solution", "Molarity of a base"],
        correctAnswer: 1,
        explanation: "Ka is the acid dissociation constant — a larger Ka means the acid ionizes more and is a stronger weak acid."
      }
    ]
  },
  {
    id: "titrations-buffers",
    topicId: "acids-bases",
    title: "Titrations & Buffers",
    description: "pH curves, equivalence points, indicators, and the Henderson-Hasselbalch equation",
    videoUrl: "https://www.youtube.com/embed/qCDSfihEhno",
    duration: "8 min",
    notes: `
# Titrations & Buffers

## Acid-Base Titrations

A **titration** is an analytical technique to determine the concentration of an unknown acid or base.

### Key Terms
- **Titrant**: Solution of known concentration (added from burette)
- **Analyte**: Solution of unknown concentration
- **Equivalence point**: Moles acid = moles base
- **Endpoint**: When the indicator changes color

### Types of Titration Curves

| Titration | pH at equivalence | Indicator |
|-----------|-------------------|-----------|
| Strong acid + Strong base | 7 | Bromothymol blue |
| Weak acid + Strong base | > 7 | Phenolphthalein |
| Strong acid + Weak base | < 7 | Methyl orange |

::diagram:titration-curve

### Polyprotic Titration Curves

Titrating a polyprotic acid (like H₂SO₄ or H₃PO₄) with a strong base produces a curve with **one equivalence point (and one buffer region) per ionizable proton**, since each proton is neutralized in turn at its own pH range — a diprotic acid's curve shows two distinct "jumps," and a triprotic acid's shows three, each successive jump typically less sharp than the last as the remaining acid gets weaker (successive Ka values shrink).

### Half-Equivalence Point
At the half-equivalence point: **pH = pKa**
This is where [HA] = [A⁻]

## Buffers

A **buffer** is a solution that resists changes in pH when small amounts of acid or base are added.

### Components
- A **weak acid** and its **conjugate base** (e.g., CH₃COOH / CH₃COO⁻)
- OR a **weak base** and its **conjugate acid** (e.g., NH₃ / NH₄⁺)

### Henderson-Hasselbalch Equation

**pH = pKa + log([A⁻]/[HA])**

### How Buffers Work
- **Add acid**: The conjugate base (A⁻) neutralizes it → A⁻ + H⁺ → HA
- **Add base**: The weak acid (HA) neutralizes it → HA + OH⁻ → A⁻ + H₂O

### Buffer Capacity
- Maximum when [HA] = [A⁻] (pH = pKa)
- Effective within pH = pKa ± 1
- Greater concentrations = greater buffer capacity

### Worked Example: Preparing a Buffer of a Target pH

You need 1.00 L of an acetate buffer (Ka of acetic acid = 1.8 × 10⁻⁵, so pKa = 4.74) at pH 5.00. If you start with 0.200 mol of acetic acid, how many moles of sodium acetate must you add?

1. Apply Henderson-Hasselbalch: pH = pKa + log([A⁻]/[HA]) → 5.00 = 4.74 + log([A⁻]/[HA])
2. Solve for the ratio: log([A⁻]/[HA]) = 0.26 → [A⁻]/[HA] = 10^0.26 = **1.82**
3. Since [HA] = 0.200 mol (in 1.00 L, so molarity = moles here), [A⁻] = 1.82 × 0.200 = **0.364 mol of sodium acetate** must be added.
4. Quick sanity check: the target pH (5.00) is a bit higher than pKa (4.74), so we correctly needed *more* conjugate base than weak acid (ratio > 1) — Henderson-Hasselbalch always pushes pH above pKa when [A⁻] > [HA].

## pH Indicators

Weak acids that change color based on pH:
- **Methyl orange**: Red (pH < 3.1) → Yellow (pH > 4.4)
- **Bromothymol blue**: Yellow (pH < 6.0) → Blue (pH > 7.6)
- **Phenolphthalein**: Colorless (pH < 8.2) → Pink (pH > 10)
    `,
    quiz: [
      {
        question: "At the equivalence point of a strong acid-strong base titration, the pH is:",
        options: ["Less than 7", "Exactly 7", "Greater than 7", "Variable"],
        correctAnswer: 1,
        explanation: "When a strong acid reacts with a strong base, the equivalence point is pH 7 because neither the cation nor anion affect pH."
      },
      {
        question: "The Henderson-Hasselbalch equation is pH = pKa + log([A⁻]/[HA]). When [A⁻] = [HA], what is the pH?",
        options: ["0", "7", "14", "pKa"],
        correctAnswer: 3,
        explanation: "When [A⁻] = [HA], log(1) = 0, so pH = pKa + 0 = pKa. This is also the half-equivalence point."
      },
      {
        question: "What makes a good buffer solution?",
        options: ["A strong acid and strong base", "A weak acid and its conjugate base", "Pure water", "Two strong acids"],
        correctAnswer: 1,
        explanation: "Buffers consist of a weak acid/base pair. The weak acid neutralizes added base, and the conjugate base neutralizes added acid."
      },
      {
        question: "Which indicator would be best for a weak acid - strong base titration (equivalence pH ~9)?",
        options: ["Methyl orange", "Bromothymol blue", "Phenolphthalein", "Litmus"],
        correctAnswer: 2,
        explanation: "Phenolphthalein changes color around pH 8-10, which matches the equivalence point of a weak acid-strong base titration."
      }
    ]
  },

  // ==============================
  // Unit 9: Thermodynamics & Electrochemistry
  // ==============================
  {
    id: "entropy-gibbs",
    topicId: "electrochemistry",
    title: "Entropy & Gibbs Free Energy",
    description: "Predicting spontaneity with ΔG = ΔH - TΔS",
    videoUrl: "https://www.youtube.com/embed/lN66F9V7-_Q",
    duration: "14 min",
    notes: `
# Entropy & Gibbs Free Energy

## Entropy (S)

Entropy measures the **dispersal of energy and matter** — often described as "disorder."

### Second Law of Thermodynamics
For any spontaneous process, the **total entropy of the universe must increase**.

### Entropy Increases When:
- Solid → Liquid → Gas (phase changes)
- Temperature increases
- Number of moles of gas increases
- Mixing occurs
- Dissolving occurs

### Standard Entropy Change
**ΔS°rxn = Σ S°(products) - Σ S°(reactants)**

### The Third Law of Thermodynamics

Unlike enthalpy (where only *changes*, ΔH, are meaningful — there's no true zero), entropy has an absolute reference point: the **Third Law of Thermodynamics** states that the entropy of a perfect crystal at absolute zero (0 K) is exactly zero, since a perfectly ordered crystal with no thermal motion has exactly one possible arrangement. This is why standard entropy values, S°, are tabulated as absolute quantities (always positive), unlike ΔHf° (which is defined relative to elements in their standard state).

## Gibbs Free Energy (G)

The ultimate predictor of **thermodynamic favorability**:

**ΔG = ΔH - TΔS**

### Interpreting ΔG
| ΔG | Meaning |
|----|---------|
| ΔG < 0 | Spontaneous (thermodynamically favorable) |
| ΔG > 0 | Non-spontaneous |
| ΔG = 0 | At equilibrium |

### Predicting Spontaneity
| ΔH | ΔS | Spontaneous? |
|----|-----|-------------|
| - | + | Always spontaneous |
| + | - | Never spontaneous |
| - | - | Spontaneous at low T |
| + | + | Spontaneous at high T |

### Worked Example: Calculating ΔG and Finding the Crossover Temperature

A reaction has ΔH = −92.4 kJ and ΔS = −198.6 J/K (both per mole, at 298 K). Is it spontaneous at 298 K? Above what temperature does that change?

1. **Watch your units** — ΔH is in kJ, ΔS is in J/K; convert ΔS to kJ/K first: −198.6 J/K = −0.1986 kJ/K.
2. ΔG = ΔH − TΔS = −92.4 − (298)(−0.1986) = −92.4 − (−59.2) = −92.4 + 59.2 = **−33.2 kJ** → negative, so **spontaneous at 298 K**.
3. Since ΔH < 0 and ΔS < 0, this reaction is only spontaneous at **low** temperature (from the table above) — there's some crossover temperature above which it flips to non-spontaneous. Find it by setting ΔG = 0: 0 = ΔH − TΔS → T = ΔH/ΔS = (−92.4) / (−0.1986) = **465 K**.
4. So this reaction is spontaneous below 465 K and non-spontaneous above it — exactly the pattern the ΔH < 0, ΔS < 0 row predicts, now with an exact number attached.

## Linking ΔG to Equilibrium

**ΔG° = -RT ln K**

- If K > 1 → ΔG° < 0 (spontaneous)
- If K < 1 → ΔG° > 0 (non-spontaneous)
- If K = 1 → ΔG° = 0 (equilibrium)

## Linking ΔG to Electrochemistry

**ΔG° = -nFE°**

Where n = moles of electrons, F = Faraday's constant, E° = standard cell potential.
    `,
    quiz: [
      {
        question: "A negative ΔG means the reaction is:",
        options: ["Endothermic", "Spontaneous", "Non-spontaneous", "At equilibrium"],
        correctAnswer: 1,
        explanation: "ΔG < 0 indicates a thermodynamically favorable (spontaneous) process."
      },
      {
        question: "Which situation is ALWAYS spontaneous?",
        options: ["ΔH > 0, ΔS < 0", "ΔH < 0, ΔS > 0", "ΔH > 0, ΔS > 0", "ΔH < 0, ΔS < 0"],
        correctAnswer: 1,
        explanation: "When ΔH is negative (exothermic) and ΔS is positive (entropy increases), ΔG = ΔH - TΔS is always negative."
      },
      {
        question: "At equilibrium, ΔG equals:",
        options: ["ΔH", "-TΔS", "Zero", "Infinity"],
        correctAnswer: 2,
        explanation: "At equilibrium, the system has no driving force in either direction, so ΔG = 0."
      },
      {
        question: "Entropy typically increases when:",
        options: ["Gas → Solid", "Temperature decreases", "A solid dissolves in water", "Fewer gas moles are produced"],
        correctAnswer: 2,
        explanation: "Dissolving increases entropy because solute particles become dispersed throughout the solvent."
      }
    ]
  },
  {
    id: "galvanic-electrolytic-cells",
    topicId: "electrochemistry",
    title: "Galvanic & Electrolytic Cells",
    description: "Batteries, cell potentials, Nernst equation, and electrolysis",
    videoUrl: "https://www.youtube.com/embed/vachnhy4AAs",
    duration: "11 min",
    notes: `
# Galvanic & Electrolytic Cells

## Galvanic (Voltaic) Cells

Produce electricity from **spontaneous** redox reactions.

::diagram:galvanic-cell

### Components
- **Anode**: Oxidation occurs (negative terminal)
- **Cathode**: Reduction occurs (positive terminal)
- **Salt bridge**: Maintains electrical neutrality
- **Wire**: Electrons flow from anode to cathode

### Memory Aid: AN OX, RED CAT
- **AN**ode = **OX**idation
- **RED**uction = **CAT**hode

### Cell Notation (Line Notation)

Rather than drawing the whole cell, chemists describe it compactly in **line notation**: anode half-cell | anode electrolyte || cathode electrolyte | cathode half-cell, with a single "|" marking a phase boundary and a double "||" marking the salt bridge. For the classic zinc-copper cell:

**Zn(s) | Zn²⁺(aq) || Cu²⁺(aq) | Cu(s)**

Read left to right, this tells you: zinc solid is the anode (oxidation, matching "AN OX" — always written first), zinc ions are in the anode's solution, the salt bridge separates the two half-cells, copper ions are in the cathode's solution, and copper solid is the cathode (reduction).

### Standard Cell Potential
**E°cell = E°cathode - E°anode**

- E°cell > 0: Spontaneous (galvanic cell works)
- E°cell < 0: Non-spontaneous (requires electrolysis)

## Standard Reduction Potentials

Higher (more positive) E° = better oxidizing agent (easier to reduce)

| Half-Reaction | E° (V) |
|---------------|--------|
| F₂ + 2e⁻ → 2F⁻ | +2.87 |
| Ag⁺ + e⁻ → Ag | +0.80 |
| Cu²⁺ + 2e⁻ → Cu | +0.34 |
| 2H⁺ + 2e⁻ → H₂ | 0.00 |
| Zn²⁺ + 2e⁻ → Zn | -0.76 |
| Li⁺ + e⁻ → Li | -3.04 |

## Nernst Equation

For non-standard conditions:

**E = E° - (RT/nF)lnQ**

At 25°C: **E = E° - (0.0592/n)logQ**

### Worked Example

For the cell Zn(s) | Zn²⁺(aq, 0.010 M) || Cu²⁺(aq, 1.0 M) | Cu(s) at 25°C, find the actual cell potential. (E°cell = 0.34 − (−0.76) = 1.10 V, and the overall reaction Zn + Cu²⁺ → Zn²⁺ + Cu transfers n = 2 electrons.)

1. Write the reaction quotient the same way you would for any equilibrium expression, using only the species that actually change concentration: Q = [Zn²⁺] ÷ [Cu²⁺] = 0.010 ÷ 1.0 = 0.010.
2. Substitute into the Nernst equation: E = 1.10 − (0.0592/2)log(0.010) = 1.10 − (0.0296)(−2) = 1.10 + 0.0592 = **1.159 V**.
3. Notice the cell potential went *up* compared to standard conditions — that makes sense, because a lower [Zn²⁺] (below the standard 1 M) makes it easier for the forward reaction (which produces more Zn²⁺) to proceed, by Le Chatelier's principle, so the reaction becomes more, not less, favorable.

## Electrolytic Cells

Use external voltage to drive **non-spontaneous** reactions.

### Applications
- Electroplating metals
- Decomposition of water: 2H₂O → 2H₂ + O₂
- Purifying metals (refining copper)

### Faraday's Law
The amount of substance produced is proportional to the charge passed:
**moles = It/nF**
(I = current in amps, t = time in seconds, F = 96485 C/mol)
    `,
    quiz: [
      {
        question: "In a galvanic cell, oxidation occurs at the:",
        options: ["Cathode", "Salt bridge", "Anode", "Wire"],
        correctAnswer: 2,
        explanation: "AN OX — oxidation always occurs at the ANode. Electrons flow from the anode to the cathode."
      },
      {
        question: "A positive standard cell potential (E°cell > 0) indicates:",
        options: ["Non-spontaneous reaction", "Spontaneous reaction", "Equilibrium", "No reaction"],
        correctAnswer: 1,
        explanation: "E°cell > 0 means the reaction is spontaneous and the galvanic cell will produce electricity."
      },
      {
        question: "What is the purpose of a salt bridge?",
        options: ["To allow electron flow", "To maintain electrical neutrality", "To increase voltage", "To store energy"],
        correctAnswer: 1,
        explanation: "The salt bridge allows ions to flow between half-cells, maintaining electrical neutrality as electrons flow through the wire."
      },
      {
        question: "Electrolytic cells differ from galvanic cells because they:",
        options: ["Produce electricity", "Are spontaneous", "Use external voltage to drive non-spontaneous reactions", "Don't involve redox"],
        correctAnswer: 2,
        explanation: "Electrolytic cells use external electrical energy to force non-spontaneous reactions to occur (opposite of galvanic cells)."
      }
    ]
  },

  // ==============================
  // Periodic Trends (kept from original)
  // ==============================
  {
    id: "reading-periodic-table",
    topicId: "periodic-trends",
    title: "Reading the Periodic Table",
    description: "Master the organization of elements",
    videoUrl: "https://www.youtube.com/embed/T6j9Gw1EyPU",
    duration: "25 min",
    notes: `
# Reading the Periodic Table

The periodic table is the most important tool in chemistry. Here's how to read it like a pro!

## Basic Layout

### Periods (Rows)
- 7 horizontal rows
- Period number = number of electron shells
- Properties change gradually across a period

### Groups (Columns)
- 18 vertical columns
- Elements in the same group have similar properties
- Same number of valence electrons

## Element Information

Each element box typically shows:
1. **Atomic Number** (top) - Number of protons
2. **Symbol** (center) - 1-2 letter abbreviation
3. **Name** (below symbol)
4. **Atomic Mass** (bottom) - Average mass

## Important Groups

| Group | Name | Valence e⁻ | Examples |
|-------|------|------------|----------|
| 1     | Alkali Metals | 1 | Li, Na, K |
| 2     | Alkaline Earth | 2 | Mg, Ca, Ba |
| 17    | Halogens | 7 | F, Cl, Br |
| 18    | Noble Gases | 8 | He, Ne, Ar |

## Color Coding

Most periodic tables use colors to show:
- **Metals** (left side, ~75% of elements) — lustrous, malleable, ductile, good conductors
- **Nonmetals** (right side) — generally dull, brittle, poor conductors
- **Metalloids** (staircase line, e.g. B, Si, Ge, As, Sb, Te) — properties intermediate between the two, often useful as semiconductors

## The Blocks of the Periodic Table

Beyond metals/nonmetals, the table is also divided by *which sub-shell is being filled*, which is the more fundamental reason elements in the same region behave alike:
- **s-block** (Groups 1-2): filling an s sub-shell — reactive metals.
- **p-block** (Groups 13-18): filling a p sub-shell — everything from metalloids to the noble gases.
- **d-block** (Groups 3-12, the "transition metals"): filling a d sub-shell — dense, hard metals with variable oxidation states and often-colored compounds (e.g. Fe, Cu, Ag, Au).
- **f-block** (the two rows usually printed below the main table, the **lanthanides and actinides**): filling an f sub-shell — very similar to each other in properties, since the f electrons being added are buried deep inside the atom and barely affect chemistry.

::diagram:periodic-trends

::diagram:periodic-table-blocks

## Pro Tips 💡
- Group number often = valence electrons (for main group elements)
- Period number = number of electron shells
- Atomic mass generally increases left to right, top to bottom (a few pairs like Ar/K, Co/Ni and Te/I are exceptions)
    `,
    quiz: [
      {
        question: "What do elements in the same group have in common?",
        options: ["Same number of protons", "Same number of valence electrons", "Same atomic mass", "Same number of neutrons"],
        correctAnswer: 1,
        explanation: "Elements in the same group (column) have the same number of valence electrons, which gives them similar chemical properties."
      },
      {
        question: "What does the period number tell you?",
        options: ["Number of protons", "Number of electron shells", "Number of valence electrons", "Atomic mass"],
        correctAnswer: 1,
        explanation: "The period number indicates how many electron shells the atom has."
      },
      {
        question: "Which group contains the noble gases?",
        options: ["Group 1", "Group 2", "Group 17", "Group 18"],
        correctAnswer: 3,
        explanation: "Noble gases are in Group 18 (the rightmost column). They have full outer shells and are very unreactive."
      },
      {
        question: "What are metalloids?",
        options: ["Pure metals", "Pure nonmetals", "Elements with properties of both metals and nonmetals", "Radioactive elements"],
        correctAnswer: 2,
        explanation: "Metalloids are found along the staircase line and have properties intermediate between metals and nonmetals."
      }
    ]
  },
  {
    id: "atomic-radius",
    topicId: "periodic-trends",
    title: "Atomic Radius Trends",
    description: "Learn how atom sizes change across the periodic table",
    videoUrl: "https://www.youtube.com/embed/vbIcPMD4HBg",
    duration: "9 min",
    notes: `
# Atomic Radius Trends

Atomic radius is the distance from the nucleus to the outermost electrons.

## Trend Across a Period (→)

**Atomic radius DECREASES** left to right.

Why?
- More protons in the nucleus
- Stronger nuclear pull on electrons
- Same number of shells, but electrons pulled closer

Example: Li (152 pm) → Be (112 pm) → B (85 pm) → C (77 pm)

## Trend Down a Group (↓)

**Atomic radius INCREASES** going down.

Why?
- More electron shells added
- Outer electrons farther from nucleus
- Inner electrons shield outer ones from nuclear charge

Example: Li (152 pm) → Na (186 pm) → K (227 pm)

## Key Concepts

### Effective Nuclear Charge (Zeff)
The net positive charge felt by outer electrons.
- Increases across a period
- Explains why atoms shrink left to right

### Shielding Effect
Inner electrons "shield" outer electrons from the full nuclear charge.
- Increases down a group
- Explains why atoms grow larger down a group

## Important Comparisons

| Comparison | Larger Atom | Why |
|------------|-------------|-----|
| Na vs Mg   | Na          | Fewer protons, less pull |
| Na vs K    | K           | More shells |
| O vs S     | S           | More shells |
| F vs I     | I           | More shells |

## Ionic Radius

When atoms become ions:
- **Cations (+ ions)**: Smaller than parent atom (losing an electron reduces electron-electron repulsion, and can remove an entire outer shell)
- **Anions (- ions)**: Larger than parent atom (adding an electron increases electron-electron repulsion, letting the electron cloud spread out)

### Isoelectronic Comparisons

Species with the *same number of electrons* let you isolate the effect of nuclear charge alone, since electron count and configuration are held constant. Na⁺, Mg²⁺, and Al³⁺ are all isoelectronic with neon (10 electrons each), but their radii shrink in that order — Na⁺ > Mg²⁺ > Al³⁺ — because each successive ion has one more proton pulling on the identical 10-electron cloud. The same logic run in the opposite direction explains why anions in an isoelectronic series (like N³⁻, O²⁻, F⁻, all 10 electrons) get *smaller* as you move toward more protons: N³⁻ > O²⁻ > F⁻.
    `,
    quiz: [
      {
        question: "How does atomic radius change across a period (left to right)?",
        options: ["Increases", "Decreases", "Stays the same", "First increases then decreases"],
        correctAnswer: 1,
        explanation: "Atomic radius decreases across a period because more protons create a stronger nuclear pull, drawing electrons closer."
      },
      {
        question: "Which atom is larger: Na or K?",
        options: ["Na", "K", "They're the same size", "It depends on the isotope"],
        correctAnswer: 1,
        explanation: "K (potassium) is larger because it's below Na in the same group. Going down a group adds more electron shells."
      },
      {
        question: "What is the shielding effect?",
        options: ["Protons blocking neutrons", "Inner electrons reducing nuclear pull on outer electrons", "Electrons in the same shell repelling each other", "The nucleus expanding"],
        correctAnswer: 1,
        explanation: "The shielding effect occurs when inner electrons partially block the nuclear charge from reaching outer electrons."
      },
      {
        question: "When an atom loses an electron to form a cation, what happens to its size?",
        options: ["It gets larger", "It gets smaller", "It stays the same", "It disappears"],
        correctAnswer: 1,
        explanation: "Cations are smaller than their parent atoms because there are fewer electrons to repel each other."
      }
    ]
  },

  // ==============================
  // Element Groups
  // ==============================
  {
    id: "alkali-metals",
    topicId: "element-groups",
    title: "Alkali & Alkaline Earth Metals",
    description: "Explore the most reactive metals",
    videoUrl: "https://www.youtube.com/embed/uGwJj3bVb4s",
    duration: "12 min",
    notes: `
# Alkali & Alkaline Earth Metals

These are the most reactive metals in the periodic table!

## Alkali Metals (Group 1)

**Elements**: Li, Na, K, Rb, Cs, Fr

### Properties
- 1 valence electron
- Very soft (can be cut with a knife)
- Low density (Li, Na, K float on water)
- Silvery appearance
- Low melting points for metals
- Highly reactive

### Reactivity
- React violently with water
- React with oxygen (tarnish quickly)
- Always found as compounds in nature
- Stored under oil to prevent reaction

### Reaction with Water
2Na + 2H₂O → 2NaOH + H₂ ⬆️

The reaction produces:
- Sodium hydroxide (a strong base)
- Hydrogen gas (can ignite!)

### Trend: Reactivity increases down the group
Li < Na < K < Rb < Cs

**Why?** Reactivity here means "how easily the atom loses its single valence electron." Going down the group, that electron sits in a progressively higher, larger shell — farther from the nucleus and more shielded by inner electrons — so it takes less energy to remove (ionization energy decreases), and the reaction with water becomes correspondingly more violent.

## Alkaline Earth Metals (Group 2)

**Elements**: Be, Mg, Ca, Sr, Ba, Ra

### Properties
- 2 valence electrons
- Harder than alkali metals
- Higher melting points
- Less reactive than Group 1
- Still quite reactive

### Reaction with Water — A Group-2 Trend Worth Knowing

Unlike alkali metals (which all react vigorously), Group 2 reactivity with water fades in from barely-existent to noticeable:
- **Be**: does not react with water at all, even when heated — its very small, highly charge-dense ion makes the metal unusually unreactive for this group.
- **Mg**: reacts only with steam (hot water vapor), not cold water.
- **Ca, Sr, Ba**: react with cold water directly, releasing H₂ gas, with vigor increasing down the group — e.g. Ca(s) + 2H₂O(l) → Ca(OH)₂(aq) + H₂(g).

### Common Uses
| Element | Uses |
|---------|------|
| Mg | Fireworks, flares, alloys |
| Ca | Bones, teeth, cement |
| Ba | X-ray imaging, fireworks |

### Flame Colors 🔥
- Lithium: Red
- Sodium: Yellow
- Potassium: Lilac/Purple
- Calcium: Orange-red
- Barium: Green
    `,
    quiz: [
      {
        question: "How many valence electrons do alkali metals have?",
        options: ["1", "2", "7", "8"],
        correctAnswer: 0,
        explanation: "Alkali metals (Group 1) have 1 valence electron, which they easily lose to form +1 ions."
      },
      {
        question: "Why are alkali metals stored under oil?",
        options: ["To keep them shiny", "To prevent reaction with air and water", "To keep them cold", "To make them harder"],
        correctAnswer: 1,
        explanation: "Alkali metals are so reactive they would react with oxygen and moisture in the air. Oil creates a protective barrier."
      },
      {
        question: "Which alkali metal is the most reactive?",
        options: ["Lithium", "Sodium", "Potassium", "Cesium"],
        correctAnswer: 3,
        explanation: "Reactivity increases down the group. Cesium (Cs) is the most reactive alkali metal that's not radioactive."
      },
      {
        question: "What color flame does sodium produce?",
        options: ["Red", "Green", "Yellow", "Purple"],
        correctAnswer: 2,
        explanation: "Sodium produces a bright, persistent yellow flame. This is why sodium street lamps have that distinctive color."
      }
    ]
  }
];

export const getLesson = (lessonId: string): Lesson | undefined => {
  return lessons.find(lesson => lesson.id === lessonId);
};

export const getLessonsByTopic = (topicId: string): Lesson[] => {
  return lessons.filter(lesson => lesson.topicId === topicId);
};
