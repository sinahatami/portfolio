/**
 * Jacquard weaving for the woven name at the top of the home page.
 *
 * A grid of crossings: `cols` warp threads by `rows` picks of weft, stored
 * row-major (index = row * cols + col). At each crossing one thread shows on
 * top. The ground is a warp-faced twill, which reads as indigo with a
 * diagonal; the lettering is a weft-faced satin, which reads as ecru floats.
 */

/** The warp shows at this crossing. */
export const WARP_UP = 1;
/** The weft shows at this crossing. */
export const WEFT_UP = 0;

export type Crossing = typeof WARP_UP | typeof WEFT_UP;

/** 3/1 twill: each warp floats over three picks and under one, stepping by one. */
export function twill(col: number, row: number): Crossing {
  return (col + row) % 4 === 0 ? WEFT_UP : WARP_UP;
}

/**
 * 16-end satin: long weft floats, tied down by the warp once in sixteen
 * crossings, stepping five threads per pick so the ties scatter instead of
 * lining up. Long floats keep woven lettering smooth.
 */
export function satin(col: number, row: number): Crossing {
  return (col * 5 + row) % 16 === 0 ? WARP_UP : WEFT_UP;
}

/** 1 where a pixel's alpha passes the threshold, from RGBA image data. */
export function coverageMask(
  rgba: ArrayLike<number>,
  threshold = 120
): Uint8Array {
  const mask = new Uint8Array(Math.floor(rgba.length / 4));
  for (let k = 0; k < mask.length; k++) {
    mask[k] = (rgba[k * 4 + 3] ?? 0) > threshold ? 1 : 0;
  }
  return mask;
}

/**
 * The crossing at every cell: twill outside the lettering mask, satin inside
 * it. Ties stay off the letters' outlines, which keeps their edges clean.
 */
export function weavePattern(
  mask: ArrayLike<number>,
  cols: number,
  rows: number
): Uint8Array {
  const inside = (col: number, row: number) =>
    col >= 0 && row >= 0 && col < cols && row < rows
      ? mask[row * cols + col] === 1
      : false;
  const pattern = new Uint8Array(cols * rows);
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const k = row * cols + col;
      if (!inside(col, row)) {
        pattern[k] = twill(col, row);
        continue;
      }
      const outline =
        !inside(col - 1, row) ||
        !inside(col + 1, row) ||
        !inside(col, row - 1) ||
        !inside(col, row + 1);
      pattern[k] = outline ? WEFT_UP : satin(col, row);
    }
  }
  return pattern;
}

/**
 * Thread spacing in CSS pixels for lettering of a given font size: about 34
 * threads to the em, so letters stay legible, in half-pixel steps (whole
 * device pixels at 2x) and between 3 and 6 pixels, so the weave stays
 * visible on phones and fine on wide screens.
 */
export function threadPitch(fontSize: number): number {
  const pitch = Math.round((fontSize / 34) * 2) / 2;
  return Math.min(6, Math.max(3, pitch));
}

/** A stable value in [0, 1) per thread, for the unevenness of real yarn. */
export function slub(seed: number): number {
  let x = Math.imul(seed ^ 0x9e3779b9, 0x85ebca6b);
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35);
  x ^= x >>> 16;
  return (x >>> 0) / 4294967296;
}

/* ------------------------------------------------------------------------ */
/* Thread colour                                                            */
/* ------------------------------------------------------------------------ */

/** Thread colours, as HSL; they match the denim tokens in globals.css. */
export const THREADS = {
  /** The shadow between threads. */
  gap: "#0a1127",
  /** Indigo warp. */
  warp: { h: 226, s: 46, l: 25 },
  /** Ground weft: undyed cotton, mostly hidden, so it reads dusty blue. */
  ground: { h: 224, s: 22, l: 40 },
  /** Lettering weft: ecru. */
  letter: { h: 42, s: 38, l: 90 },
} as const;

export type ThreadKind = "warp" | "ground" | "letter";

export interface ThreadStop {
  offset: number;
  h: number;
  s: number;
  l: number;
}

/**
 * Shading across one thread, edge to edge: darker edges and a lighter
 * crown, so a float reads round. `index` is the warp thread or the pick;
 * its slub shifts the lightness a little, like real yarn.
 */
export function threadStops(kind: ThreadKind, index: number): ThreadStop[] {
  const { h, s, l } = THREADS[kind];
  if (kind === "letter") {
    const base = l + (slub(index + 977) - 0.5) * 4;
    return [
      { offset: 0, h, s, l: base - 14 },
      { offset: 0.42, h, s: s - 6, l: Math.min(base + 5, 98) },
      { offset: 1, h, s, l: base - 17 },
    ];
  }
  if (kind === "warp") {
    const base = l + (slub(index + 11) - 0.5) * 6;
    return [
      { offset: 0, h, s, l: base - 7 },
      { offset: 0.45, h, s: s - 4, l: base + 7 },
      { offset: 1, h, s, l: base - 9 },
    ];
  }
  const base = l + (slub(index + 977) - 0.5) * 6;
  return [
    { offset: 0, h, s, l: base - 8 },
    { offset: 0.42, h, s, l: base + 5 },
    { offset: 1, h, s, l: base - 10 },
  ];
}

/** `#rrggbb` for an HSL colour (hue in degrees, saturation and lightness in %). */
export function hslToHex(h: number, s: number, l: number): string {
  const sat = Math.min(Math.max(s, 0), 100) / 100;
  const light = Math.min(Math.max(l, 0), 100) / 100;
  const a = sat * Math.min(light, 1 - light);
  const channel = (n: number) => {
    const k = (n + h / 30) % 12;
    const value = light - a * Math.max(-1, Math.min(k - 3, 9 - k, 1));
    return Math.round(value * 255)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${channel(0)}${channel(8)}${channel(4)}`;
}

/* ------------------------------------------------------------------------ */
/* Static weaving (the social image)                                         */
/* ------------------------------------------------------------------------ */

export interface CellMask {
  mask: Uint8Array;
  /** Cells across the image (picks, one per screen column of thread). */
  across: number;
  /** Cells down the image (warp threads). */
  down: number;
}

/**
 * Lettering mask at thread resolution from a rendered image: a cell is
 * lettering when the mean of one channel over its pixels is past half.
 * Area coverage keeps outlines truer than sampling one pixel per cell.
 */
export function cellCoverage(
  rgba: ArrayLike<number>,
  width: number,
  height: number,
  pitch: number,
  channel = 0
): CellMask {
  const across = Math.ceil(width / pitch);
  const down = Math.ceil(height / pitch);
  const mask = new Uint8Array(across * down);
  for (let y = 0; y < down; y++) {
    const y0 = Math.floor(y * pitch);
    const y1 = Math.min(height, Math.floor((y + 1) * pitch));
    for (let x = 0; x < across; x++) {
      const x0 = Math.floor(x * pitch);
      const x1 = Math.min(width, Math.floor((x + 1) * pitch));
      let sum = 0;
      let count = 0;
      for (let py = y0; py < y1; py++) {
        for (let px = x0; px < x1; px++) {
          sum += rgba[(py * width + px) * 4 + channel] ?? 0;
          count++;
        }
      }
      mask[y * across + x] = count > 0 && sum / count > 127.5 ? 1 : 0;
    }
  }
  return { mask, across, down };
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/**
 * The woven band as an SVG document, for places without a canvas. Same
 * cloth as the home page: turned a quarter, so warp runs along the band
 * (horizontal floats) and each pick is a screen column (vertical floats).
 * `mask` is in screen order: `across` cells by `down` cells.
 */
export function wovenSvg({
  mask,
  across,
  down,
  pitch: p,
}: CellMask & { pitch: number }): string {
  // Pattern space: col = warp thread = screen row, row = pick = screen column.
  const cols = down;
  const rows = across;
  const letters = new Uint8Array(cols * rows);
  for (let y = 0; y < down; y++) {
    for (let x = 0; x < across; x++) {
      letters[x * cols + y] = mask[y * across + x] ?? 0;
    }
  }
  const pattern = weavePattern(letters, cols, rows);
  const warpUp = (col: number, row: number) =>
    pattern[row * cols + col] === WARP_UP;
  const isLetter = (col: number, row: number) =>
    letters[row * cols + col] === 1;

  const side = p * 0.09;
  const letterSide = p * 0.02;
  const gap = p * 0.13;
  const radius = round2(p * 0.4);
  const gradients = new Map<string, string>();
  const shade = (kind: ThreadKind, index: number, vertical: boolean) => {
    const id = `${kind[0]}${index}`;
    if (!gradients.has(id)) {
      const stops = threadStops(kind, index)
        .map(
          (stop) =>
            `<stop offset="${stop.offset}" stop-color="${hslToHex(stop.h, stop.s, stop.l)}"/>`
        )
        .join("");
      const axis = vertical ? 'x2="0" y2="1"' : 'x2="1" y2="0"';
      gradients.set(
        id,
        `<linearGradient id="${id}" x1="0" y1="0" ${axis}>${stops}</linearGradient>`
      );
    }
    return id;
  };
  const rects: string[] = [];
  const rect = (x: number, y: number, w: number, h: number, fill: string) =>
    rects.push(
      `<rect x="${round2(x)}" y="${round2(y)}" width="${round2(w)}" height="${round2(h)}" rx="${radius}" fill="url(#${fill})"/>`
    );

  // Warp floats: runs along each warp thread, shaded top to bottom.
  for (let col = 0; col < cols; col++) {
    let row = 0;
    while (row < rows) {
      if (!warpUp(col, row)) {
        row++;
        continue;
      }
      const start = row;
      while (row < rows && warpUp(col, row)) row++;
      const fill = shade("warp", col, true);
      rect(
        start * p + gap,
        col * p + side,
        (row - start) * p - gap * 2,
        p - side * 2,
        fill
      );
    }
  }
  // Weft floats: runs down each pick, split where lettering starts or ends.
  for (let row = 0; row < rows; row++) {
    let col = 0;
    while (col < cols) {
      if (warpUp(col, row)) {
        col++;
        continue;
      }
      const start = col;
      const letter = isLetter(col, row);
      while (col < cols && !warpUp(col, row) && isLetter(col, row) === letter) {
        col++;
      }
      const inset = letter ? letterSide : side;
      const fill = shade(letter ? "letter" : "ground", row, false);
      rect(
        row * p + inset,
        start * p + gap,
        p - inset * 2,
        (col - start) * p - gap * 2,
        fill
      );
    }
  }

  const width = round2(across * p);
  const height = round2(down * p);
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">` +
    `<defs>${[...gradients.values()].join("")}</defs>` +
    `<rect width="${width}" height="${height}" fill="${THREADS.gap}"/>` +
    rects.join("") +
    "</svg>"
  );
}
