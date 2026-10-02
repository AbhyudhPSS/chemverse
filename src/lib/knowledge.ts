import { chapters } from "../data/class10";
import { lessons } from "../data/lessons";
import { experiments } from "../data/experiments";
import { elements, categoryLabels } from "../data/elements";
import { reactions } from "../data/reactions";

export interface Passage {
  id: string;
  title: string;
  text: string;
  href: string;
}

/** Strips the markdown-lite markers so the model reads clean prose. */
const plain = (md: string) =>
  md
    .replace(/::diagram:[\w-]+/g, "")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(/^>\s*\[!\w+\]\s*/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

let cache: Passage[] | null = null;

/**
 * Everything the assistant is allowed to talk about, as retrievable passages.
 * Chapter notes are split by section so a question pulls back just the
 * relevant part rather than an entire chapter.
 */
export const buildCorpus = (): Passage[] => {
  if (cache) return cache;
  const out: Passage[] = [];

  for (const ch of chapters) {
    const href = `/class10/${ch.id}`;
    // One passage per "## " section, so retrieval returns just that part.
    ch.notes.split(/\n## /).forEach((raw, i) => {
      const body = i === 0 ? raw : `## ${raw}`;
      const heading = body.match(/^##?\s*(.+)/m)?.[1]?.trim() ?? ch.title;
      const text = plain(body);
      if (text.length < 40) return;
      out.push({
        id: `c10-${ch.id}-${i}`,
        title: `Class 10 · Chapter ${ch.number} (${ch.title}) — ${heading}`,
        text,
        href,
      });
    });

    for (const e of ch.experiments) {
      out.push({
        id: `exp-${e.id}`,
        title: `Class 10 activity — ${e.title}${e.activityRef ? ` (${e.activityRef})` : ""}`,
        text: [
          `Aim: ${e.aim}`,
          `Apparatus: ${e.materials.join("; ")}`,
          `Method: ${e.procedure.join(" ")}`,
          `Observation: ${e.observation}`,
          e.reaction ? `Reaction: ${e.reaction}` : "",
          `Conclusion: ${e.conclusion}`,
        ]
          .filter(Boolean)
          .join("\n"),
        href,
      });
    }

    ch.objectiveQuestions.forEach((q, i) =>
      out.push({
        id: `mcq-${ch.id}-${i}`,
        title: `Class 10 practice question — ${ch.title}`,
        text: `Q: ${q.question}\nAnswer: ${q.options[q.correctAnswer]}\nWhy: ${q.explanation}`,
        href,
      }),
    );

    ch.subjectiveQuestions.forEach((q, i) =>
      out.push({
        id: `subj-${ch.id}-${i}`,
        title: `Class 10 ${q.marks}-mark question — ${ch.title}`,
        text: `Q: ${q.question}\nModel answer: ${plain(q.answer)}`,
        href,
      }),
    );
  }

  for (const l of lessons) {
    out.push({
      id: `lesson-${l.id}`,
      title: `AP Chemistry lesson — ${l.title}`,
      text: `${l.description}\n${plain(l.notes)}`,
      href: `/learn/${l.id}`,
    });
  }

  for (const r of reactions) {
    out.push({
      id: `rxn-${r.pair.join("-")}`,
      title: `Reaction — ${r.equation}`,
      text: `Type: ${r.type}\nEquation: ${r.equation}\nObservation: ${r.observation}\n${r.explanation}`,
      href: "/experiments/reaction-bench",
    });
  }

  for (const x of experiments) {
    out.push({
      id: `lab-${x.id}`,
      title: `Lab tool — ${x.title}`,
      text: `${x.description} Topic: ${x.unit}. Level: ${x.difficulty}.`,
      href: `/experiments/${x.id}`,
    });
  }

  for (const el of elements) {
    out.push({
      id: `el-${el.atomicNumber}`,
      title: `Element ${el.atomicNumber} — ${el.name} (${el.symbol})`,
      text: [
        `${el.name}, symbol ${el.symbol}, atomic number ${el.atomicNumber}, atomic mass ${el.atomicMass}.`,
        `Category: ${categoryLabels[el.category]}. Period ${el.period}, block ${el.block}.`,
        `Electron configuration ${el.electronConfiguration}; shells ${el.electronShells.join(", ")}.`,
        el.facts?.length ? `Facts: ${el.facts.join(" ")}` : "",
      ]
        .filter(Boolean)
        .join(" "),
      href: `/element/${el.atomicNumber}`,
    });
  }

  cache = out;
  return out;
};

const STOP = new Set([
  "the","a","an","of","and","or","is","are","was","were","to","in","on","for","with","what","why",
  "how","does","do","did","it","its","this","that","these","those","be","by","as","at","from","can",
  "i","you","me","my","we","us","explain","tell","give","about","please","between","difference",
]);

const tokenise = (s: string) =>
  s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter((t) => t.length > 1 && !STOP.has(t));

/** Minimum score before a passage counts as genuinely relevant. */
const RELEVANCE_FLOOR = 4;

const escape = (t: string) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * Keyword retrieval — enough to ground answers without an embedding model.
 * Matching is on whole words, and a passage must clear RELEVANCE_FLOOR, so an
 * off-topic question returns nothing and the assistant declines rather than
 * grasping at an incidental substring.
 */
export const retrieve = (query: string, k = 6): Passage[] => {
  const terms = [...new Set(tokenise(query))];
  if (!terms.length) return [];

  const scored = buildCorpus()
    .map((p) => {
      const title = p.title.toLowerCase();
      const hay = `${title}\n${p.text.toLowerCase()}`;
      let score = 0;
      let matched = 0;

      for (const t of terms) {
        const re = new RegExp(`\\b${escape(t)}`, "g");
        const hits = (hay.match(re) ?? []).length;
        if (!hits) continue;
        matched += 1;
        // A long word like "rancidity" identifies a topic on its own, while a
        // short one like "made" barely narrows anything — weight accordingly.
        const weight = t.length >= 8 ? 3 : t.length >= 6 ? 2 : 1;
        score += Math.min(hits, 4) * weight;
        if (new RegExp(`\\b${escape(t)}`).test(title)) score += 3;
      }

      // Reward passages that cover more of the question, not just one word a lot.
      score *= 1 + (matched - 1) * 0.6;
      return { p, score, matched };
    })
    .filter((r) => r.score >= RELEVANCE_FLOOR)
    .sort((a, b) => b.score - a.score);

  // A single weak keyword hit is not a topic match.
  if (!scored.length || (scored[0].matched < 2 && terms.length > 1 && scored[0].score < RELEVANCE_FLOOR * 2)) {
    return [];
  }

  return scored.slice(0, k).map((r) => r.p);
};
