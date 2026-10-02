import { chapters } from "../data/class10";
import { elements, categoryLabels } from "../data/elements";
import { reactions, nonReactions, reagents, getReagent } from "../data/reactions";

/* ------------------------------------------------------------------ *
 * Local answering — no model, no network, no quota.
 *
 * Safety rule, learned the hard way: this NEVER composes text. It either
 * returns a verified answer verbatim, or it returns null and lets the
 * caller fall back. Stitching fragments together is what produced the
 * "displacement reaction" answer that actually defined precipitation.
 * ------------------------------------------------------------------ */

export interface LocalAnswer {
  answer: string;
  source: { title: string; href: string };
  /** How the answer was found, for display and for tests. */
  via: "curated" | "definition" | "element" | "reaction" | "detail";
}

const STOP = new Set([
  "the","a","an","of","and","or","is","are","was","were","to","in","on","for","with","what","why",
  "how","does","do","did","it","its","this","that","these","those","be","by","as","at","from","can",
  "i","you","me","my","we","us","explain","tell","give","about","please","define","mean","means",
]);

const tokens = (s: string) =>
  s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter((t) => t.length > 2 && !STOP.has(t));

/** Jaccard overlap — good enough to spot a rephrased version of a known question. */
const similarity = (a: string, b: string) => {
  const A = new Set(tokens(a));
  const B = new Set(tokens(b));
  if (!A.size || !B.size) return 0;
  let shared = 0;
  A.forEach((t) => {
    if (B.has(t)) shared += 1;
  });
  return shared / new Set([...A, ...B]).size;
};

/* ---------- Tier 1: the chapter's own verified question bank ---------- */

interface Curated {
  question: string;
  answer: string;
  title: string;
  href: string;
}

let curatedCache: Curated[] | null = null;

const curatedBank = (): Curated[] => {
  if (curatedCache) return curatedCache;
  const out: Curated[] = [];

  for (const ch of chapters) {
    const href = `/class10/${ch.id}`;
    for (const q of ch.objectiveQuestions) {
      out.push({
        question: q.question,
        // The explanation is the teaching content; the option alone is terse.
        answer: `${q.options[q.correctAnswer]}. ${q.explanation}`,
        title: `Chapter ${ch.number} — ${ch.title}`,
        href,
      });
    }
    for (const q of ch.subjectiveQuestions) {
      out.push({
        question: q.question,
        answer: q.answer.replace(/\*\*(.*?)\*\*/g, "$1"),
        title: `Chapter ${ch.number} — ${ch.title}`,
        href,
      });
    }
  }

  curatedCache = out;
  return out;
};

/* ---------- Tier 2: heading-anchored definitions ---------- */

/** The thing being asked about, e.g. "displacement reaction". */
const subjectOf = (question: string): string | null => {
  const m =
    question.match(/what\s+(?:is|are)\s+(?:an?\s+|the\s+)?([^?]+)/i) ??
    question.match(/define\s+(?:an?\s+|the\s+)?([^?]+)/i) ??
    question.match(/meaning\s+of\s+([^?]+)/i);
  if (!m) return null;
  return m[1].trim().replace(/[.?!]+$/, "").toLowerCase();
};

/**
 * The notes define a concept as a heading followed by prose:
 *
 *   ### 3. Displacement (Single Displacement) Reaction
 *   A reaction in which a more reactive element displaces a less reactive...
 *
 * So the definition is found by matching the HEADING, not by hunting for an
 * "X is Y" sentence. Sentence-hunting is what let a line about precipitation
 * answer a question about displacement: it happened to contain both words.
 */
interface Definition {
  term: string;
  /** The heading exactly as written — compound formulae often live here. */
  raw: string;
  body: string;
  title: string;
  href: string;
}

let defCache: Definition[] | null = null;

const normaliseTerm = (heading: string) =>
  heading
    .replace(/^#{1,6}\s*/, "")
    .replace(/^\d+[.)]\s*/, "") // "3. "
    .replace(/\*\*/g, "")
    .replace(/\([^)]*\)/g, " ") // drop parentheticals
    .replace(/[—–-]\s.*$/, "") // drop " — Sodium Hydroxide"
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

const definitionIndex = (): Definition[] => {
  if (defCache) return defCache;
  const out: Definition[] = [];

  for (const ch of chapters) {
    const href = `/class10/${ch.id}`;
    const lines = ch.notes.split("\n");

    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i].trim();
      if (!/^#{2,4}\s+/.test(line)) continue;

      const term = normaliseTerm(line);
      if (!term || term.length < 4) continue;

      // Take the first block of prose under the heading, verbatim.
      const body: string[] = [];
      for (let j = i + 1; j < lines.length && body.length < 2; j += 1) {
        const next = lines[j].trim();
        if (!next) continue;
        if (/^#{1,6}\s/.test(next)) break; // next heading
        if (next.startsWith("|") || next.startsWith("::diagram:")) break;
        body.push(
          next
            .replace(/^[-*]\s+/, "")
            .replace(/^>\s*\[![a-z]+\]\s*/i, "")
            .replace(/^>\s?/, "")
            .replace(/\*\*(.*?)\*\*/g, "$1"),
        );
      }

      const text = body.join(" ").trim();
      if (text.length < 40) continue;

      out.push({
        term,
        raw: line.replace(/^#{1,6}\s*/, "").replace(/^\d+[.)]\s*/, "").replace(/\*\*/g, "").trim(),
        body: text,
        title: `Chapter ${ch.number} — ${ch.title}`,
        href,
      });
    }
  }

  defCache = out;
  return out;
};

/** Match the asked-about subject against a heading, requiring a real overlap. */
const findDefinition = (subject: string): Definition | null => {
  const want = tokens(subject);
  if (!want.length) return null;

  let best: { def: Definition; score: number } | null = null;

  for (const def of definitionIndex()) {
    const have = new Set(tokens(def.term));
    if (!have.size) continue;

    // Every significant word of the subject must appear in the HEADING itself.
    const covered = want.every((w) => have.has(w));
    if (!covered) continue;

    // Prefer the tightest heading: "displacement reaction" over
    // "double displacement reaction" when asked about the former.
    const score = 1 / (1 + Math.abs(have.size - want.length));
    if (!best || score > best.score) best = { def, score };
  }

  return best?.def ?? null;
};

/* ---------- Public entry point ---------- */

/**
 * The substances a question is about. If a student names one the stored
 * question never mentions, it is a different question however similar the
 * wording — "Does copper react with HCl?" must not be answered by a stored
 * question about zinc.
 */
const CHEM_NOUNS = new Set<string>([
  ...elements.map((e) => e.name.toLowerCase()),
  "acid", "acids", "alkali", "base", "bases", "salt", "salts", "oxide", "oxides",
  "hydroxide", "sulphate", "sulfate", "nitrate", "chloride", "carbonate",
  "bicarbonate", "hydrogencarbonate", "iodide", "bromide", "soda", "lime",
  "gypsum", "rust", "limewater", "brine", "hydrochloric", "sulphuric", "nitric",
  "acetic", "ethanoic", "bleaching", "plaster", "washing", "baking", "caustic",
]);

const chemTerms = (q: string) => tokens(q).filter((t) => CHEM_NOUNS.has(t));

const curatedResolver = (question: string): LocalAnswer | null => {
  const askedChem = chemTerms(question);

  let best: { item: Curated; score: number } | null = null;
  for (const item of curatedBank()) {
    const score = similarity(question, item.question);
    if (!best || score > best.score) best = { item, score };
  }
  if (!best || best.score < 0.6) return null;

  // Every substance the student named must appear in the stored question.
  const storedChem = new Set(chemTerms(best.item.question));
  if (askedChem.some((w) => !storedChem.has(w))) return null;
  return {
    answer: best.item.answer,
    source: { title: best.item.title, href: best.item.href },
    via: "curated",
  };
};

const definitionResolver = (question: string): LocalAnswer | null => {
  const subject = subjectOf(question);
  if (!subject) return null;
  const def = findDefinition(subject);
  if (!def) return null;
  return {
    answer: def.body,
    source: { title: def.title, href: def.href },
    via: "definition",
  };
};

/**
 * Answer from the site's own verified content, or return null so the caller
 * can fall through to the model. Order matters: the most specific, most
 * reliably-correct routes are tried first.
 */
export const answerLocally = (question: string): LocalAnswer | null => {
  const resolvers = [
    curatedResolver, // a question the chapter already answers
    reactionResolver, // an audited reaction from the bench
    elementResolver, // a fact from the periodic table data
    definitionResolver, // a definition anchored to a heading
    detailResolver, // preparation, uses, properties, formula
  ];

  for (const resolve of resolvers) {
    const hit = resolve(question);
    if (hit) return hit;
  }
  return null;
};

/* ------------------------------------------------------------------ *
 * Tier 3 — element facts
 *
 * These are formatted from verified numeric fields, not selected from
 * prose, so there is nothing to misquote.
 * ------------------------------------------------------------------ */

const ELEMENT_ATTRS: { keys: RegExp; render: (el: (typeof elements)[number]) => string }[] = [
  {
    keys: /atomic number|proton number/i,
    render: (el) => `${el.name} (${el.symbol}) has atomic number ${el.atomicNumber}.`,
  },
  {
    keys: /atomic mass|atomic weight|molar mass/i,
    render: (el) => `The atomic mass of ${el.name} (${el.symbol}) is ${el.atomicMass}.`,
  },
  {
    keys: /electron configuration|electronic configuration|configuration/i,
    render: (el) =>
      `${el.name} has the electron configuration ${el.electronConfiguration}, with ${el.electronShells.join(", ")} electrons in its shells.`,
  },
  {
    keys: /symbol/i,
    render: (el) => `The symbol for ${el.name} is ${el.symbol} (atomic number ${el.atomicNumber}).`,
  },
  {
    keys: /categor|group|type of element|metal or/i,
    render: (el) =>
      `${el.name} (${el.symbol}) is classified as a ${categoryLabels[el.category].toLowerCase()}, in period ${el.period}, ${el.block}-block.`,
  },
  {
    keys: /valence|shells|how many electron/i,
    render: (el) =>
      `${el.name} has ${el.electronShells.join(", ")} electrons in its shells, so ${el.electronShells[el.electronShells.length - 1]} in the outermost shell.`,
  },
];

/** Longest name first so "carbon dioxide" cannot match as "carbon". */
const elementsByName = [...elements].sort((a, b) => b.name.length - a.name.length);

const findElement = (question: string) => {
  const lower = question.toLowerCase();
  const byName = elementsByName.find((el) => new RegExp(`\\b${el.name.toLowerCase()}\\b`).test(lower));
  if (byName) return byName;
  // Symbols are case-sensitive and short, so match on the original text.
  return elements.find((el) => new RegExp(`\\b${el.symbol}\\b`).test(question)) ?? null;
};

const elementResolver = (question: string): LocalAnswer | null => {
  const attr = ELEMENT_ATTRS.find((a) => a.keys.test(question));
  if (!attr) return null;
  const el = findElement(question);
  if (!el) return null;

  return {
    answer: attr.render(el),
    source: { title: `Element ${el.atomicNumber} — ${el.name}`, href: `/element/${el.atomicNumber}` },
    via: "element",
  };
};

/* ------------------------------------------------------------------ *
 * Tier 4 — "what happens when A reacts with B"
 *
 * Returned verbatim from the reaction bench data, which was checked in
 * the chemistry audit.
 * ------------------------------------------------------------------ */

const reagentAliases: Record<string, RegExp> = {
  zn: /\bzinc\b|\bZn\b/i,
  fe: /\biron\b|\bFe\b/i,
  cu: /\bcopper\b|\bCu\b/i,
  mg: /\bmagnesium\b|\bMg\b/i,
  hcl: /hydrochloric acid|\bHCl\b/i,
  h2so4: /sulphuric acid|sulfuric acid|H₂SO₄|H2SO4/i,
  naoh: /sodium hydroxide|caustic soda|\bNaOH\b/i,
  limewater: /lime ?water|calcium hydroxide/i,
  cuso4: /copper sulphate|copper sulfate|CuSO₄|CuSO4/i,
  feso4: /iron\s*\(?\s*(?:ii)?\s*\)?\s*sulphate|ferrous sulphate|FeSO₄|FeSO4/i,
  pbno3: /lead nitrate|Pb\(NO₃\)₂/i,
  ki: /potassium iodide|\bKI\b/i,
  bacl2: /barium chloride|BaCl₂|BaCl2/i,
  na2so4: /sodium sulphate|Na₂SO₄|Na2SO4/i,
  agno3: /silver nitrate|AgNO₃|AgNO3/i,
  nacl: /sodium chloride|common salt|table salt|\bNaCl\b/i,
  na2co3: /sodium carbonate|washing soda|Na₂CO₃|Na2CO3/i,
  nahco3: /sodium (hydrogen)?carbonate|baking soda|NaHCO₃|NaHCO3/i,
  cao: /quick ?lime|calcium oxide|\bCaO\b/i,
  h2o: /\bwater\b|H₂O|H2O/i,
  co2: /carbon dioxide|CO₂|CO2/i,
};

const reactionResolver = (question: string): LocalAnswer | null => {
  if (!/react|mix|add|happens when|combine|put .* into|displace|dissolve/i.test(question)) return null;

  // Match longest-first and consume the matched span, so "zinc sulphate"
  // cannot also register as the metal "zinc". Without this, "can copper
  // displace zinc from zinc sulphate" matched the copper+zinc-metal pair and
  // answered with the wrong reasoning entirely.
  let remaining = question;
  const found: string[] = [];

  const ordered = Object.entries(reagentAliases).sort((a, b) => {
    const len = (r: RegExp) => r.source.length;
    return len(b[1]) - len(a[1]);
  });

  for (const [id, pattern] of ordered) {
    const re = new RegExp(pattern.source, "i");
    const m = remaining.match(re);
    if (!m) continue;
    found.push(id);
    remaining = remaining.slice(0, m.index) + " ".repeat(m[0].length) + remaining.slice((m.index ?? 0) + m[0].length);
  }

  if (found.length < 2) return null;

  // If the question names a compound we hold no reagent for (e.g. "zinc
  // sulphate"), do not quietly answer about the bare metal instead. Every
  // occurrence must be checked: in "displace zinc from zinc sulphate" the
  // first "zinc" is followed by "from", and only the second reveals the
  // compound.
  const COMPOUND_TAIL = /^(sulphate|sulfate|nitrate|chloride|carbonate|iodide|hydroxide|oxide|bromide)$/i;
  for (const id of found) {
    const alias = reagentAliases[id];
    if (!alias) continue;
    const scan = new RegExp(`(?:${alias.source})\\s+(\\w+)`, "gi");
    for (const m of question.matchAll(scan)) {
      if (!COMPOUND_TAIL.test(m[1])) continue;
      // The phrase is a compound. Do we actually hold a reagent for it?
      const known = reagents.some(
        (r) => r.id !== id && new RegExp(reagentAliases[r.id]?.source ?? "$^", "i").test(m[0]),
      );
      if (!known) return null;
    }
  }

  const key = (a: string, b: string) => [a, b].sort().join("+");
  const wanted = new Set<string>();
  for (let i = 0; i < found.length; i += 1) {
    for (let j = i + 1; j < found.length; j += 1) wanted.add(key(found[i], found[j]));
  }

  const name = (id: string) => getReagent(id)?.name ?? id;

  const hit = reactions.find((r) => wanted.has(key(...r.pair)));
  if (hit) {
    return {
      answer: `${name(hit.pair[0])} + ${name(hit.pair[1])} — ${hit.type}.\n${hit.equation}\nWhat you see: ${hit.observation}\n${hit.explanation}`,
      source: { title: "Reaction Bench", href: "/experiments/reaction-bench" },
      via: "reaction",
    };
  }

  // "No reaction" is a syllabus point in its own right — a student asking
  // whether copper displaces zinc needs the reason, not silence.
  const none = nonReactions.find((r) => wanted.has(key(...r.pair)));
  if (none) {
    return {
      answer: `No reaction. ${none.explanation}`,
      source: { title: "Reaction Bench", href: "/experiments/reaction-bench" },
      via: "reaction",
    };
  }

  return null;
};

/* ------------------------------------------------------------------ *
 * Tier 5 — preparation, properties and uses
 *
 * The notes list these as bullets under a compound's heading, so they
 * can be returned verbatim with the heading as context.
 * ------------------------------------------------------------------ */

interface Detail {
  term: string;
  kind: "preparation" | "uses" | "properties" | "formula";
  text: string;
  title: string;
  href: string;
}

let detailCache: Detail[] | null = null;

const DETAIL_PATTERNS: { kind: Detail["kind"]; test: RegExp }[] = [
  { kind: "preparation", test: /^(made by|prepared by|preparation|obtained by|it is made|it is prepared)/i },
  { kind: "uses", test: /^uses?\b|^used (for|as|in)/i },
  { kind: "formula", test: /^(chemical )?formula\b|^chemical name/i },
  { kind: "properties", test: /^(properties|it is a|on heating)/i },
];

const detailIndex = (): Detail[] => {
  if (detailCache) return detailCache;
  const out: Detail[] = [];

  for (const ch of chapters) {
    const href = `/class10/${ch.id}`;
    const lines = ch.notes.split("\n");
    let heading = "";

    for (const raw of lines) {
      const line = raw.trim();
      if (/^#{2,4}\s+/.test(line)) {
        heading = normaliseTerm(line);
        continue;
      }
      if (!heading) continue;

      const body = line
        .replace(/^[-*]\s+/, "")
        .replace(/\*\*(.*?)\*\*/g, "$1")
        .trim();
      if (body.length < 20) continue;

      const match = DETAIL_PATTERNS.find((d) => d.test.test(body));
      if (match) out.push({ term: heading, kind: match.kind, text: body, title: `Chapter ${ch.number} — ${ch.title}`, href });
    }
  }

  detailCache = out;
  return out;
};

const detailResolver = (question: string): LocalAnswer | null => {
  const kind: Detail["kind"] | null = /how is .* (made|prepared)|preparation of|how do you (make|prepare)/i.test(question)
    ? "preparation"
    : /uses? of|what is .* used for|applications? of/i.test(question)
      ? "uses"
      : /formula (of|for)|chemical name/i.test(question)
        ? "formula"
        : /propert/i.test(question)
          ? "properties"
          : null;
  if (!kind) return null;

  const asked = tokens(question).filter((w) => !["made", "prepared", "used", "uses", "formula", "properties", "preparation"].includes(w));
  if (!asked.length) return null;

  // Compound formulae are written into the heading, e.g.
  // "Plaster of Paris — Calcium Sulphate Hemihydrate (CaSO₄·½H₂O)".
  if (kind === "formula") {
    let bestDef: { def: Definition; score: number } | null = null;
    for (const def of definitionIndex()) {
      const term = new Set(tokens(def.term));
      const overlap = asked.filter((w) => term.has(w)).length;
      if (!overlap) continue;
      const score = overlap / Math.max(term.size, 1);
      if (!bestDef || score > bestDef.score) bestDef = { def, score };
    }
    if (bestDef && bestDef.score >= 0.5) {
      return {
        answer: bestDef.def.raw,
        source: { title: bestDef.def.title, href: bestDef.def.href },
        via: "detail",
      };
    }
  }

  const candidates = detailIndex().filter((d) => d.kind === kind);
  let best: { d: Detail; score: number } | null = null;

  for (const d of candidates) {
    const term = new Set(tokens(d.term));
    const overlap = asked.filter((w) => term.has(w)).length;
    if (!overlap) continue;
    const score = overlap / Math.max(term.size, 1);
    if (!best || score > best.score) best = { d, score };
  }

  if (!best || best.score < 0.4) return null;

  return {
    answer: best.d.text,
    source: { title: best.d.title, href: best.d.href },
    via: "detail",
  };
};
