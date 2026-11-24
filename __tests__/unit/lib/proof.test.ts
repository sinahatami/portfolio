import type { Recommendation } from "@/domain/portfolio";
import { annotateHeadline, resolveProofNotes } from "@/lib/proof";

describe("annotateHeadline", () => {
  const headline = "I build web platforms and the systems behind them.";

  it("places each marker right after the text it supports", () => {
    expect(
      annotateHeadline(headline, [
        { after: "web platforms" },
        { after: "systems" },
        { after: "behind them." },
      ])
    ).toEqual([
      { text: "I build web platforms", note: 1 },
      { text: " and the systems", note: 2 },
      { text: " behind them.", note: 3 },
    ]);
  });

  it("keeps the numbering when a note's text is missing", () => {
    expect(
      annotateHeadline(headline, [{ after: "nowhere" }, { after: "systems" }])
    ).toEqual([
      { text: "I build web platforms and the systems", note: 2 },
      { text: " behind them." },
    ]);
  });

  it("matches notes in reading order only", () => {
    expect(
      annotateHeadline(headline, [{ after: "systems" }, { after: "web" }])
    ).toEqual([
      { text: "I build web platforms and the systems", note: 1 },
      { text: " behind them." },
    ]);
  });
});

describe("resolveProofNotes", () => {
  const letters: Recommendation[] = [
    {
      id: "ada",
      author: "Ada Lovelace",
      role: "Mentor",
      organization: "Analytical Engines",
      highlight: "Remarkably thorough.",
      letter: "Full text.",
    },
  ];

  it("numbers facts and quotes references from their letters", () => {
    const notes = resolveProofNotes(
      [
        {
          kind: "fact",
          after: "a",
          cite: "Acme",
          title: "Acme",
          body: "Shipped it.",
          link: { label: "See the role", href: "#experience-acme" },
        },
        { kind: "reference", after: "b", recommendationId: "ada" },
      ],
      letters
    );
    expect(notes[0]).toMatchObject({ number: 1, title: "Acme", quote: false });
    expect(notes[1]).toEqual({
      number: 2,
      cite: "Letter from Ada Lovelace",
      title: "Remarkably thorough.",
      body: "Ada Lovelace, Mentor, Analytical Engines",
      quote: true,
      link: { label: "Read the letter", href: "#reference-ada" },
    });
  });

  it("drops a reference whose letter is missing", () => {
    expect(
      resolveProofNotes(
        [{ kind: "reference", after: "b", recommendationId: "nobody" }],
        letters
      )
    ).toEqual([]);
  });
});
