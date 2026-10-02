import React from "react";

import { cn } from "@/lib/utils";
import { diagrams } from "@/components/class10/diagrams";

export interface NoteHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

const plain = (text: string) => text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/`([^`]+)`/g, "$1");

/** Section headings, in document order, for the table of contents. */
export const extractHeadings = (notes: string): NoteHeading[] =>
  notes
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("## ") || line.startsWith("### "))
    .map((line) => {
      const level = line.startsWith("### ") ? 3 : 2;
      const text = plain(line.slice(level === 3 ? 4 : 3));
      return { id: slugify(text), text, level: level as 2 | 3 };
    });

/**
 * Readable prose for text-to-speech: drops tables, diagrams and markers, and
 * turns headings into short spoken pauses.
 */
export const extractSpeechText = (notes: string): string => {
  const out: string[] = [];

  for (const raw of notes.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("|")) continue; // tables don't read well aloud
    if (line.startsWith("::diagram:")) continue;
    if (line.startsWith("# ")) continue;

    if (line.startsWith("### ")) {
      out.push(`${plain(line.slice(4))}.`);
    } else if (line.startsWith("## ")) {
      out.push(`${plain(line.slice(3))}.`);
    } else if (line.startsWith(">")) {
      out.push(plain(line.replace(/^>\s?/, "").replace(/^\[![a-z]+\]\s*/i, "")));
    } else if (line.startsWith("- ")) {
      out.push(plain(line.slice(2)));
    } else if (/^\d+\.\s/.test(line)) {
      out.push(plain(line.replace(/^\d+\.\s/, "")));
    } else {
      out.push(plain(line));
    }
  }

  return out.join(" ");
};

/* ------------------------------------------------------------------ */
/* Inline formatting                                                   */
/* ------------------------------------------------------------------ */

const renderInline = (text: string, keyPrefix: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-b-${i}`} className="font-semibold text-foreground">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code
          key={`${keyPrefix}-c-${i}`}
          className="rounded border border-cobalt/25 bg-cobalt/10 px-1.5 py-0.5 font-mono text-[0.875em] text-cobalt"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return <React.Fragment key={`${keyPrefix}-t-${i}`}>{part}</React.Fragment>;
  });
};

const isTableSeparator = (line: string) => /^\s*\|?[\s|:-]+\|?\s*$/.test(line) && line.includes("-");

/* ------------------------------------------------------------------ */
/* Call-outs                                                           */
/* ------------------------------------------------------------------ */

const calloutStyles = {
  note: { label: "Note", box: "border-cobalt bg-cobalt/[0.07]", text: "text-cobalt", dot: "bg-cobalt" },
  tip: { label: "Tip", box: "border-viridian bg-viridian/[0.07]", text: "text-viridian", dot: "bg-viridian" },
  warning: { label: "Watch out", box: "border-saffron bg-saffron/[0.09]", text: "text-saffron", dot: "bg-saffron" },
  key: { label: "Key idea", box: "border-magenta bg-magenta/[0.07]", text: "text-magenta", dot: "bg-magenta" },
  example: { label: "Example", box: "border-iris bg-iris/[0.07]", text: "text-iris", dot: "bg-iris" },
} as const;

type CalloutKind = keyof typeof calloutStyles;

/** Section markers cycle through the palette so long chapters stay lively. */
const sectionPigments = [
  "bg-cobalt",
  "bg-magenta",
  "bg-viridian",
  "bg-saffron",
  "bg-iris",
  "bg-copper",
  "bg-cyanine",
  "bg-crimson",
];

/* ------------------------------------------------------------------ */
/* Renderer                                                            */
/* ------------------------------------------------------------------ */

const NotesRenderer = ({ notes }: { notes: string }) => {
  const lines = notes.split("\n");
  const out: React.ReactNode[] = [];
  let i = 0;
  let sectionIndex = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed === "") {
      i++;
      continue;
    }

    // ---- Diagram directive: ::diagram:<id> --------------------------
    if (trimmed.startsWith("::diagram:")) {
      const id = trimmed.slice("::diagram:".length).trim();
      const Diagram = diagrams[id];
      if (Diagram) out.push(<Diagram key={`diagram-${i}`} />);
      i++;
      continue;
    }

    // ---- Table ------------------------------------------------------
    if (trimmed.startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      const rows = tableLines
        .filter((l) => !isTableSeparator(l))
        .map((l) =>
          l
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim()),
        );

      if (rows.length) {
        const [header, ...body] = rows;
        out.push(
          <div key={`table-${i}`} className="relative my-7 rounded-lg border border-border">
            <div className="overflow-x-auto rounded-lg">
            <table className="w-full min-w-[30rem] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-cobalt/[0.08]">
                  {header.map((cell, ci) => (
                    <th
                      key={ci}
                      scope="col"
                      className="border-b border-border px-4 py-3 font-semibold text-cobalt"
                    >
                      {renderInline(cell, `th-${i}-${ci}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {body.map((row, ri) => (
                  <tr key={ri} className="align-top odd:bg-muted/40">
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={cn(
                          "border-b border-border px-4 py-3 leading-relaxed last:border-b-0",
                          ci === 0 ? "font-medium text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {renderInline(cell, `td-${i}-${ri}-${ci}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-r-lg bg-gradient-to-l from-background to-transparent sm:hidden"
            />
          </div>,
        );
      }
      continue;
    }

    // ---- Call-out ---------------------------------------------------
    if (trimmed.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }

      // An optional [!kind] marker on the first line selects the style.
      let kind: CalloutKind = "note";
      const marker = quote[0]?.match(/^\[!([a-z]+)\]\s*/i);
      if (marker) {
        const found = marker[1].toLowerCase() as CalloutKind;
        if (found in calloutStyles) kind = found;
        quote[0] = quote[0].replace(marker[0], "");
      }
      const style = calloutStyles[kind];

      out.push(
        <aside
          key={`quote-${i}`}
          className={cn("my-7 rounded-r-lg border-l-[3px] px-5 py-4", style.box)}
        >
          <p className={cn("eyebrow mb-2", style.text)}>{style.label}</p>
          <div className="space-y-2">
            {quote
              .filter((q) => q.trim() !== "")
              .map((q, qi) => {
                // Bullets inside a call-out keep their list appearance.
                if (q.trimStart().startsWith("- ")) {
                  return (
                    <p
                      key={qi}
                      className="flex gap-2.5 text-[0.9375rem] leading-[1.7] text-foreground/85"
                    >
                      <span
                        aria-hidden="true"
                        className={cn("mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full", style.dot)}
                      />
                      <span>{renderInline(q.trimStart().slice(2), `q-${i}-${qi}`)}</span>
                    </p>
                  );
                }
                return (
                  <p key={qi} className="text-[0.9375rem] leading-[1.7] text-foreground/85">
                    {renderInline(q, `q-${i}-${qi}`)}
                  </p>
                );
              })}
          </div>
        </aside>,
      );
      continue;
    }

    // ---- Headings ---------------------------------------------------
    if (trimmed.startsWith("### ")) {
      const text = trimmed.slice(4);
      out.push(
        <h3
          key={`h3-${i}`}
          id={slugify(plain(text))}
          className="mt-9 scroll-mt-32 text-lg font-semibold text-foreground"
        >
          {renderInline(text, `h3-${i}`)}
        </h3>,
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      const text = trimmed.slice(3);
      const pigment = sectionPigments[sectionIndex % sectionPigments.length];
      sectionIndex += 1;
      out.push(
        <h2
          key={`h2-${i}`}
          id={slugify(plain(text))}
          className="mt-14 flex scroll-mt-32 items-center gap-3 border-t border-border pt-7 font-display text-3xl text-foreground first:mt-0 first:border-0 first:pt-0"
        >
          <span aria-hidden="true" className={cn("h-5 w-1.5 shrink-0 rounded-full", pigment)} />
          {renderInline(text, `h2-${i}`)}
        </h2>,
      );
      i++;
      continue;
    }

    // The document title duplicates the page masthead — skip it.
    if (trimmed.startsWith("# ")) {
      i++;
      continue;
    }

    // ---- Lists ------------------------------------------------------
    if (trimmed.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      out.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2">
          {items.map((it, ii) => (
            <li key={ii} className="flex gap-3 text-[0.9375rem] leading-[1.7] text-foreground/80">
              <span aria-hidden="true" className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt" />
              <span>{renderInline(it, `li-${i}-${ii}`)}</span>
            </li>
          ))}
        </ul>,
      );
      continue;
    }

    if (/^\d+\.\s/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      out.push(
        <ol key={`ol-${i}`} className="my-4 space-y-2.5">
          {items.map((it, ii) => (
            <li key={ii} className="flex gap-3 text-[0.9375rem] leading-[1.7] text-foreground/80">
              <span
                aria-hidden="true"
                className="mt-[0.15em] flex h-5 w-5 shrink-0 items-center justify-center rounded bg-cobalt/10 font-mono text-[0.6875rem] font-semibold text-cobalt"
              >
                {ii + 1}
              </span>
              <span>{renderInline(it, `oli-${i}-${ii}`)}</span>
            </li>
          ))}
        </ol>,
      );
      continue;
    }

    // ---- Paragraph ---------------------------------------------------
    out.push(
      <p key={`p-${i}`} className="my-4 text-[0.9375rem] leading-[1.75] text-foreground/80">
        {renderInline(trimmed, `p-${i}`)}
      </p>,
    );
    i++;
  }

  return <div>{out}</div>;
};

export default NotesRenderer;
