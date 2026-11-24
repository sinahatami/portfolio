import {
  WARP_UP,
  WEFT_UP,
  cellCoverage,
  coverageMask,
  hslToHex,
  satin,
  slub,
  threadPitch,
  threadStops,
  twill,
  weavePattern,
  wovenSvg,
} from "@/lib/weave";

describe("twill", () => {
  it("floats each warp over three picks and under one", () => {
    const column = [0, 1, 2, 3, 4, 5, 6, 7].map((row) => twill(0, row));
    expect(column).toEqual([
      WEFT_UP,
      WARP_UP,
      WARP_UP,
      WARP_UP,
      WEFT_UP,
      WARP_UP,
      WARP_UP,
      WARP_UP,
    ]);
  });

  it("steps the binding point by one thread per pick, making the diagonal", () => {
    expect(twill(1, 3)).toBe(WEFT_UP);
    expect(twill(2, 2)).toBe(WEFT_UP);
    expect(twill(3, 1)).toBe(WEFT_UP);
  });
});

describe("satin", () => {
  it("ties the weft down once in sixteen crossings", () => {
    const row = Array.from({ length: 16 }, (_, col) => satin(col, 0));
    expect(row.filter((crossing) => crossing === WARP_UP)).toHaveLength(1);
  });

  it("never ties two neighbouring warps at the same pick", () => {
    for (let row = 0; row < 16; row++) {
      for (let col = 0; col < 16; col++) {
        if (satin(col, row) === WARP_UP) {
          expect(satin(col + 1, row)).toBe(WEFT_UP);
        }
      }
    }
  });
});

describe("coverageMask", () => {
  it("marks pixels whose alpha passes the threshold", () => {
    const rgba = [0, 0, 0, 0, 0, 0, 0, 200, 0, 0, 0, 120, 0, 0, 0, 121];
    expect([...coverageMask(rgba)]).toEqual([0, 1, 0, 1]);
  });
});

describe("weavePattern", () => {
  const cols = 32;
  const rows = 32;
  // Lettering fills rows 4 to 27 and columns 4 to 27.
  const mask = new Uint8Array(cols * rows);
  for (let row = 4; row < 28; row++)
    mask.fill(1, row * cols + 4, row * cols + 28);
  const pattern = weavePattern(mask, cols, rows);
  const at = (col: number, row: number) => pattern[row * cols + col];

  it("weaves twill outside the lettering", () => {
    for (const [col, row] of [
      [0, 0],
      [3, 10],
      [30, 31],
    ] as const) {
      expect(at(col, row)).toBe(twill(col, row));
    }
  });

  it("weaves satin inside the lettering", () => {
    for (let row = 5; row < 27; row++) {
      for (let col = 5; col < 27; col++) {
        expect(at(col, row)).toBe(satin(col, row));
      }
    }
  });

  it("keeps ties off the outline", () => {
    for (let i = 4; i < 28; i++) {
      expect(at(i, 4)).toBe(WEFT_UP);
      expect(at(i, 27)).toBe(WEFT_UP);
      expect(at(4, i)).toBe(WEFT_UP);
      expect(at(27, i)).toBe(WEFT_UP);
    }
  });
});

describe("threadPitch", () => {
  it("keeps about 34 threads to the em, in half pixels", () => {
    expect(threadPitch(170)).toBe(5);
    expect(threadPitch(119)).toBe(3.5);
  });

  it("stays between 3 and 6 pixels", () => {
    expect(threadPitch(40)).toBe(3);
    expect(threadPitch(400)).toBe(6);
  });
});

describe("slub", () => {
  it("is stable and stays in [0, 1)", () => {
    expect(slub(7)).toBe(slub(7));
    for (let seed = 0; seed < 200; seed++) {
      const value = slub(seed);
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});

describe("threadStops", () => {
  it("shades each thread darker at the edges than at the crown", () => {
    for (const kind of ["warp", "ground", "letter"] as const) {
      const [edge, crown, otherEdge] = threadStops(kind, 3);
      expect(crown?.l).toBeGreaterThan(edge?.l ?? Infinity);
      expect(crown?.l).toBeGreaterThan(otherEdge?.l ?? Infinity);
    }
  });

  it("is the same for the same thread", () => {
    expect(threadStops("warp", 12)).toEqual(threadStops("warp", 12));
  });
});

describe("hslToHex", () => {
  it("converts HSL to hex", () => {
    expect(hslToHex(0, 100, 50)).toBe("#ff0000");
    expect(hslToHex(120, 100, 25)).toBe("#008000");
    expect(hslToHex(0, 0, 100)).toBe("#ffffff");
  });

  it("clamps lightness outside 0 to 100", () => {
    expect(hslToHex(42, 38, 104)).toBe("#ffffff");
    expect(hslToHex(226, 46, -3)).toBe("#000000");
  });
});

describe("cellCoverage", () => {
  // A 4 by 2 image: the left half white, the right half black.
  const width = 4;
  const height = 2;
  const rgba = Array.from({ length: width * height }, (_, i) =>
    i % width < 2 ? [255, 255, 255, 255] : [0, 0, 0, 255]
  ).flat();

  it("marks a cell when most of its pixels are lit", () => {
    const { mask, across, down } = cellCoverage(rgba, width, height, 2);
    expect([across, down]).toEqual([2, 1]);
    expect([...mask]).toEqual([1, 0]);
  });

  it("covers a partial cell at the edge", () => {
    const { across, down } = cellCoverage(rgba, width, height, 3);
    expect([across, down]).toEqual([2, 1]);
  });
});

describe("wovenSvg", () => {
  const across = 24;
  const down = 12;
  const blank = new Uint8Array(across * down);
  const lettered = new Uint8Array(across * down);
  for (let y = 3; y < 9; y++) lettered.fill(1, y * across + 6, y * across + 18);

  it("draws a sized SVG of thread floats over the gap colour", () => {
    const svg = wovenSvg({ mask: blank, across, down, pitch: 5 });
    expect(svg).toMatch(/^<svg [^>]*width="120" height="60"/);
    expect(svg).toContain('fill="#0a1127"');
    expect(svg.match(/<rect /g)?.length).toBeGreaterThan(across * down * 0.4);
  });

  it("weaves lettering in ecru weft only where the mask says", () => {
    expect(wovenSvg({ mask: blank, across, down, pitch: 5 })).not.toContain(
      'fill="url(#l'
    );
    expect(wovenSvg({ mask: lettered, across, down, pitch: 5 })).toContain(
      'fill="url(#l'
    );
  });
});
