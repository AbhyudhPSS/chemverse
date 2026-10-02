import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import Seo from "@/components/seo/Seo";
import ElementTile from "@/components/periodic-table/ElementTile";
import { elements } from "@/data/elements";
import { lessons } from "@/data/lessons";
import { experiments } from "@/data/experiments";
import { chapters as class9Chapters } from "@/data/class9";
import { chapters } from "@/data/class10";
import { chapters as class11Chapters } from "@/data/class11";
import { chapters as class12Chapters } from "@/data/class12";

/** Elements most students meet first — real data, used as the hero's image. */
const FEATURED = [1, 6, 7, 8, 11, 17, 20, 26]
  .map((n) => elements.find((el) => el.atomicNumber === n))
  .filter((el): el is (typeof elements)[number] => Boolean(el));

const sections = [
  {
    to: "/explore",
    label: "Periodic table",
    count: `${elements.length} elements`,
    description:
      "Every element by category, with electron shells, properties and the facts worth remembering.",
  },
  {
    to: "/class9",
    label: "Class 9 · NCERT",
    count: `${class9Chapters.length} chapters`,
    description:
      "States of matter, pure substances and mixtures, and the first real look at atoms — with worked experiments and graded questions.",
  },
  {
    to: "/class10",
    label: "Class 10 · NCERT",
    count: `${chapters.length} chapters`,
    description:
      "Full chapter notes, the NCERT activities written up as experiments, and questions from one to five marks.",
  },
  {
    to: "/class11",
    label: "Class 11 · NCERT",
    count: `${class11Chapters.length} chapters`,
    description:
      "The full first-year syllabus — atomic structure, bonding, equilibrium, s/p-block and organic basics — with worked experiments and graded questions.",
  },
  {
    to: "/class12",
    label: "Class 12 · NCERT",
    count: `${class12Chapters.length} chapters`,
    description:
      "Solutions through biomolecules — physical, inorganic and organic chemistry, with worked experiments and graded questions.",
  },
  {
    to: "/learn",
    label: "AP Chemistry",
    count: `${lessons.length} lessons`,
    description:
      "Atomic structure through electrochemistry — video lessons, study notes and a quiz for each topic.",
  },
  {
    to: "/experiments",
    label: "Lab & calculators",
    count: `${experiments.length} tools`,
    description:
      "Titration curves, gas laws, molar mass and equation balancing you can actually run in the browser.",
  },
];

const Home = () => (
  <>
    <Seo
      title="ChemVerse"
      description="A free chemistry study reference: the full periodic table, NCERT Class 10 chapter notes, AP Chemistry lessons, interactive lab tools and practice questions."
      path="/"
    />

    {/* Masthead */}
    <section className="border-b border-border bg-grid">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:py-20 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
        <div>
          <p className="eyebrow">Chemistry study reference</p>
          <h1 className="mt-4 font-display text-display-md leading-[1.02] sm:text-display-lg">
            Learn chemistry from the element up.
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed text-muted-foreground">
            The periodic table, worked chapter notes, lab activities and practice questions — for
            CBSE Class 9-12 and introductory university chemistry, free and without an account.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/explore">
                Open the periodic table
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/class10">Class 10 chemistry</Link>
            </Button>
          </div>
        </div>

        {/* Real tiles from the real table, not decoration. */}
        <div>
          <div className="grid max-w-sm grid-cols-4 gap-1.5 lg:max-w-none">
            {FEATURED.map((el) => (
              <ElementTile key={el.atomicNumber} element={el} size="md" />
            ))}
          </div>
          <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
            Eight of {elements.length} — select one to open it
          </p>
        </div>
      </div>
    </section>

    {/* What's inside */}
    <section className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
      <h2 className="eyebrow">What's inside</h2>

      <ul className="mt-8 border-t border-border">
        {sections.map((section) => (
          <li key={section.to}>
            <Link
              to={section.to}
              className="group grid items-baseline gap-2 border-b border-border py-6 transition-colors hover:bg-muted/50 sm:grid-cols-[13rem_1fr_auto] sm:gap-6 sm:px-3"
            >
              <span className="text-lg font-semibold text-foreground">{section.label}</span>
              <span className="measure text-sm leading-relaxed text-muted-foreground">
                {section.description}
              </span>
              <span className="flex items-center gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted-foreground">
                {section.count}
                <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>

    {/* Choose a path */}
    <section className="mx-auto max-w-6xl px-5 pb-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/class9"
          className="group rounded-lg border border-border bg-card p-7 transition-colors hover:border-foreground/25"
        >
          <p className="eyebrow">Following the NCERT syllabus</p>
          <h3 className="mt-3 font-display text-2xl text-foreground">Class 9 Chemistry</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Matter, pure substances and mixtures, atoms and molecules, and the structure of the atom
            — each with notes, experiments, videos and graded questions.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
            Start chapter 1
            <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to="/class10"
          className="group rounded-lg border border-border bg-card p-7 transition-colors hover:border-foreground/25"
        >
          <p className="eyebrow">Following the NCERT syllabus</p>
          <h3 className="mt-3 font-display text-2xl text-foreground">Class 10 Chemistry</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Reactions and equations, acids/bases/salts, metals and non-metals, and carbon compounds
            — each with notes, experiments, videos and graded questions.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
            Start chapter 1
            <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to="/class11"
          className="group rounded-lg border border-border bg-card p-7 transition-colors hover:border-foreground/25"
        >
          <p className="eyebrow">Following the NCERT syllabus</p>
          <h3 className="mt-3 font-display text-2xl text-foreground">Class 11 Chemistry</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Mole concept through hydrocarbons — atomic structure, bonding, equilibrium, s/p-block
            and organic basics — each with notes, experiments, videos and graded questions.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
            Start chapter 1
            <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to="/class12"
          className="group rounded-lg border border-border bg-card p-7 transition-colors hover:border-foreground/25"
        >
          <p className="eyebrow">Following the NCERT syllabus</p>
          <h3 className="mt-3 font-display text-2xl text-foreground">Class 12 Chemistry</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Solutions through biomolecules — physical, inorganic and organic chemistry — each with
            notes, experiments, videos and graded questions.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
            Start chapter 1
            <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
          </span>
        </Link>

        <Link
          to="/learn"
          className="group rounded-lg border border-border bg-card p-7 transition-colors hover:border-foreground/25"
        >
          <p className="eyebrow">Introductory university level</p>
          <h3 className="mt-3 font-display text-2xl text-foreground">AP Chemistry</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Nine units from atomic structure to electrochemistry, each broken into short lessons
            with notes and a quiz to check yourself.
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
            Browse the units
            <ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </section>
  </>
);

export default Home;
