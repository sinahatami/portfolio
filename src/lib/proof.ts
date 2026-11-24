import type { ProofNote, Recommendation } from "@/domain/portfolio";

/** A headline split into runs of text, some followed by a note marker. */
export interface AnnotatedSegment {
  text: string;
  /** 1-based note number placed after this text, if any. */
  note?: number;
}

/**
 * Splits a headline so each note's marker lands right after the text it
 * supports. Notes are matched in order; one whose text isn't found keeps
 * its number but gets no marker, so numbering never shifts.
 */
export function annotateHeadline(
  headline: string,
  notes: Pick<ProofNote, "after">[]
): AnnotatedSegment[] {
  const segments: AnnotatedSegment[] = [];
  let cursor = 0;
  notes.forEach((note, index) => {
    const at = headline.indexOf(note.after, cursor);
    if (note.after === "" || at === -1) return;
    const end = at + note.after.length;
    segments.push({ text: headline.slice(cursor, end), note: index + 1 });
    cursor = end;
  });
  if (cursor < headline.length) segments.push({ text: headline.slice(cursor) });
  return segments;
}

/** A note ready to render: facts as written, references quoted from letters. */
export interface ResolvedProofNote {
  number: number;
  /** The source in a few words. */
  cite: string;
  title: string;
  body?: string;
  /** True when the title is a verbatim quote from a reference letter. */
  quote: boolean;
  link: { label: string; href: string };
}

export function resolveProofNotes(
  notes: ProofNote[],
  recommendations: Recommendation[]
): ResolvedProofNote[] {
  return notes.flatMap((note, index): ResolvedProofNote[] => {
    const number = index + 1;
    if (note.kind === "fact") {
      return [
        {
          number,
          cite: note.cite,
          title: note.title,
          body: note.body,
          quote: false,
          link: note.link,
        },
      ];
    }
    const letter = recommendations.find(
      (item) => item.id === note.recommendationId
    );
    if (!letter) return [];
    return [
      {
        number,
        cite: `Letter from ${letter.author}`,
        title: letter.highlight,
        body: `${letter.author}, ${letter.role}, ${letter.organization}`,
        quote: true,
        link: { label: "Read the letter", href: `#reference-${letter.id}` },
      },
    ];
  });
}
