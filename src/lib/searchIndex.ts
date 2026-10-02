// ==================================================================
// A single, flat search index over every piece of content in the
// app — chapters across Class 9-12, AP Chemistry units and lessons,
// periodic table elements, and the lab/tools section — so the
// global search box can find "any topic" in one place.
// ==================================================================

import { chapters as class9Chapters } from "@/data/class9";
import { chapters as class10Chapters } from "@/data/class10";
import { chapters as class11Chapters } from "@/data/class11";
import { chapters as class12Chapters } from "@/data/class12";
import { lessons, units } from "@/data/lessons";
import { elements } from "@/data/elements";
import { experiments } from "@/data/experiments";

export interface SearchItem {
  /** Unique across the whole index. */
  id: string;
  title: string;
  description: string;
  /** Section the result belongs to, used to group results in the UI. */
  group: string;
  /** Route to navigate to when the result is chosen. */
  path: string;
  /** Small label shown alongside the title, e.g. "Chapter 3" or "C". */
  badge?: string;
  /** Extra text folded into matching but not necessarily shown. */
  keywords?: string;
}

interface ChapterLike {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
}

const CLASS_CHAPTER_SETS: { classLabel: string; path: string; chapters: ChapterLike[] }[] = [
  { classLabel: "Class 9", path: "class9", chapters: class9Chapters },
  { classLabel: "Class 10", path: "class10", chapters: class10Chapters },
  { classLabel: "Class 11", path: "class11", chapters: class11Chapters },
  { classLabel: "Class 12", path: "class12", chapters: class12Chapters },
];

const chapterItems: SearchItem[] = CLASS_CHAPTER_SETS.flatMap(({ classLabel, path, chapters }) =>
  chapters.map((chapter) => ({
    id: `${path}-${chapter.id}`,
    title: chapter.title,
    description: chapter.subtitle,
    group: `${classLabel} · NCERT`,
    path: `/${path}/${chapter.id}`,
    badge: `Ch ${chapter.number}`,
    keywords: chapter.description,
  })),
);

const unitItems: SearchItem[] = units.map((unit) => ({
  id: `unit-${unit.id}`,
  title: unit.title,
  description: unit.description,
  group: "AP Chemistry",
  path: `/learn#${unit.id}`,
  badge: `Unit ${unit.number}`,
}));

const lessonItems: SearchItem[] = lessons.map((lesson) => {
  const unit = units.find((u) => u.id === lesson.topicId);
  return {
    id: `lesson-${lesson.id}`,
    title: lesson.title,
    description: lesson.description,
    group: "AP Chemistry",
    path: `/learn/${lesson.id}`,
    badge: unit?.title,
  };
});

const elementItems: SearchItem[] = elements.map((element) => ({
  id: `element-${element.atomicNumber}`,
  title: `${element.name} (${element.symbol})`,
  description: `Atomic number ${element.atomicNumber} · ${element.category.replace(/-/g, " ")}`,
  group: "Periodic Table",
  path: `/element/${element.atomicNumber}`,
  badge: element.symbol,
}));

const experimentItems: SearchItem[] = experiments.map((experiment) => ({
  id: `experiment-${experiment.id}`,
  title: experiment.title,
  description: experiment.description,
  group: "Lab & Tools",
  path: `/experiments/${experiment.id}`,
  badge: experiment.type,
  keywords: experiment.tags.join(" "),
}));

/** Every searchable item in the app, in a stable order (chapters first, by class). */
export const searchIndex: SearchItem[] = [
  ...chapterItems,
  ...unitItems,
  ...lessonItems,
  ...elementItems,
  ...experimentItems,
];

/** The text cmdk's fuzzy filter matches a query against for a given item. */
export const searchItemValue = (item: SearchItem): string =>
  [item.id, item.title, item.description, item.group, item.badge, item.keywords]
    .filter(Boolean)
    .join(" ");
