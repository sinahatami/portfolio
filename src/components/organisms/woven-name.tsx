"use client";

import { useEffect, useRef } from "react";
import { Container } from "@/components/atoms";
import { cn } from "@/lib/utils";
import {
  THREADS,
  WARP_UP,
  coverageMask,
  threadPitch,
  threadStops,
  weavePattern,
  type ThreadKind,
} from "@/lib/weave";

interface WovenNameProps {
  name: string;
  /** Id of the heading, for `aria-labelledby` on the section. */
  id: string;
  className?: string;
}

/**
 * The name as a woven label: a full-width band of indigo twill with the
 * letters woven in ecru satin. The heading keeps its real text, laid out by
 * CSS; the loom measures where each word sits and weaves it there, picking
 * from left to right on first load. Without scripts, the heading shows as
 * ecru type on a CSS twill.
 */
export function WovenName({ name, id, className }: WovenNameProps) {
  const bandRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const words = name.split(" ");

  useEffect(() => {
    const band = bandRef.current;
    const canvas = canvasRef.current;
    const title = titleRef.current;
    if (!band || !canvas || !title) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stop = () => {};
    let run = 0;
    let woven = false;
    let size = "";
    let frame = 0;

    const draw = async () => {
      const current = ++run;
      const style = getComputedStyle(title);
      await document.fonts
        .load(`${style.fontWeight} ${style.fontSize} ${style.fontFamily}`)
        .catch(() => []);
      if (current !== run) return;
      stop();
      try {
        stop = weave(band, canvas, title, !woven && !reduceMotion.matches);
        woven = true;
      } catch {
        // No canvas: show the heading's own glyphs instead.
        title.style.color = "inherit";
      }
    };

    // Weave on first layout, and again (at once) whenever the band resizes.
    const observer = new ResizeObserver(([entry]) => {
      const box = entry?.contentRect;
      const next = box ? `${box.width}x${box.height}` : "";
      if (next === size) return;
      size = next;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => void draw());
    });
    observer.observe(band);

    const sheen = sheenRef.current;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const onMove = (event: PointerEvent) => {
      if (!sheen || !finePointer.matches || reduceMotion.matches) return;
      const rect = band.getBoundingClientRect();
      sheen.style.setProperty("--sheen-x", `${event.clientX - rect.left}px`);
      sheen.style.setProperty("--sheen-y", `${event.clientY - rect.top}px`);
    };
    const onLeave = () => {
      sheen?.style.removeProperty("--sheen-x");
      sheen?.style.removeProperty("--sheen-y");
    };
    band.addEventListener("pointermove", onMove);
    band.addEventListener("pointerleave", onLeave);

    return () => {
      run++;
      stop();
      cancelAnimationFrame(frame);
      observer.disconnect();
      band.removeEventListener("pointermove", onMove);
      band.removeEventListener("pointerleave", onLeave);
    };
  }, [name]);

  return (
    <div
      ref={bandRef}
      className={cn("twill relative isolate overflow-hidden", className)}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 size-full"
      />
      <div
        ref={sheenRef}
        aria-hidden
        className="woven-sheen pointer-events-none absolute inset-0"
      />
      <Container className="relative">
        <h1
          id={id}
          ref={titleRef}
          className="woven-title text-ecru -ml-[0.04em] text-[clamp(4.5rem,25vw,8rem)] leading-[0.92] font-[850] tracking-[-0.055em] sm:text-[min(15.5vw,12rem)]"
        >
          {words.map((word, index) => (
            <span key={`${word}-${index}`}>
              {index > 0 ? " " : null}
              <span data-word className="block sm:inline-block">
                {word}
              </span>
            </span>
          ))}
        </h1>
      </Container>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* The loom                                                                 */
/* ------------------------------------------------------------------------ */

const PICK_DURATION = 1300;

/** A canvas gradient across one thread, from the shared shading. */
function threadFill(
  ctx: CanvasRenderingContext2D,
  kind: ThreadKind,
  index: number,
  from: [number, number],
  to: [number, number]
) {
  const fill = ctx.createLinearGradient(...from, ...to);
  for (const stop of threadStops(kind, index)) {
    fill.addColorStop(stop.offset, `hsl(${stop.h} ${stop.s}% ${stop.l}%)`);
  }
  return fill;
}

/**
 * Weave the heading's words into the band's canvas. The cloth is turned a
 * quarter: warp runs along the band (so its finished edge, the selvedge, is
 * the band's lower edge) and each pick of weft is one screen column. Returns
 * a function that stops the animation.
 */
function weave(
  band: HTMLElement,
  canvas: HTMLCanvasElement,
  title: HTMLElement,
  animate: boolean
): () => void {
  const style = getComputedStyle(title);
  const fontSize = parseFloat(style.fontSize);
  const tracking = parseFloat(style.letterSpacing) || 0;
  const p = threadPitch(fontSize);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const box = band.getBoundingClientRect();

  // Pattern space: x runs down the band (warp threads), y across (picks).
  const width = box.height;
  const height = box.width;
  const cols = Math.ceil(width / p) + 1;
  const rows = Math.ceil(height / p) + 1;

  canvas.width = Math.round(box.width * dpr);
  canvas.height = Math.round(box.height * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D is not available");
  ctx.setTransform(0, dpr, dpr, 0, 0, 0);

  // Lettering mask: each word drawn at thread resolution where CSS put it,
  // a glyph at a time with the heading's tracking (kerning is off sitewide).
  const loom = document.createElement("canvas");
  loom.width = cols;
  loom.height = rows;
  const g = loom.getContext("2d", { willReadFrequently: true });
  if (!g) throw new Error("Canvas 2D is not available");
  g.setTransform(0, 1, 1, 0, 0, 0);
  g.font = `${style.fontWeight} ${fontSize / p}px ${style.fontFamily}`;
  g.fillStyle = "#000";
  const metrics = g.measureText(title.textContent ?? "");
  const ascent = metrics.fontBoundingBoxAscent || (fontSize / p) * 0.8;
  const descent = metrics.fontBoundingBoxDescent || (fontSize / p) * 0.2;
  for (const word of title.querySelectorAll<HTMLElement>("[data-word]")) {
    const rect = word.getBoundingClientRect();
    const lineHeight = rect.height / p;
    let x = (rect.left - box.left) / p;
    const baseline =
      (rect.top - box.top) / p + (lineHeight - ascent - descent) / 2 + ascent;
    for (const glyph of word.textContent ?? "") {
      g.fillText(glyph, x, baseline);
      x += g.measureText(glyph).width + tracking / p;
    }
  }
  const mask = coverageMask(g.getImageData(0, 0, cols, rows).data);
  const pattern = weavePattern(mask, cols, rows);
  const at = (col: number, row: number) =>
    col < 0 || row < 0 || col >= cols || row >= rows
      ? WARP_UP
      : (pattern[row * cols + col] ?? WARP_UP);
  const inLetter = (col: number, row: number) => mask[row * cols + col] === 1;

  // One gradient per warp thread and two per pick, shaded across the thread
  // so each float reads round, with a little slub in the lightness.
  const warpFill = Array.from({ length: cols }, (_, col) =>
    threadFill(ctx, "warp", col, [col * p, 0], [(col + 1) * p, 0])
  );
  const pickFill = (kind: ThreadKind) =>
    Array.from({ length: rows }, (_, row) =>
      threadFill(ctx, kind, row, [0, row * p], [0, (row + 1) * p])
    );
  const groundFill = pickFill("ground");
  const letterFill = pickFill("letter");

  const side = p * 0.09;
  // Lettering floats lie close, like packed satin; the ground stays open.
  const letterSide = p * 0.02;
  const gap = p * 0.13;
  const round = p * 0.4;
  const seam = 0.35;
  const shape = (
    x: number,
    y: number,
    w: number,
    h: number,
    radii: number[]
  ) => {
    if (typeof ctx.roundRect === "function") ctx.roundRect(x, y, w, h, radii);
    else ctx.rect(x, y, w, h);
  };

  const drawPicks = (from: number, to: number) => {
    ctx.fillStyle = THREADS.gap;
    ctx.fillRect(0, from * p, width + p, (to - from) * p);
    // Warp floats, one path per thread.
    for (let col = 0; col < cols; col++) {
      ctx.beginPath();
      for (let row = from; row < to; row++) {
        if (at(col, row) !== WARP_UP) continue;
        const above = at(col, row - 1) === WARP_UP;
        const below = at(col, row + 1) === WARP_UP;
        const y0 = row * p + (above ? -seam : gap);
        const y1 = (row + 1) * p + (below ? seam : -gap);
        const a = above ? 0 : round;
        const b = below ? 0 : round;
        shape(col * p + side, y0, p - side * 2, y1 - y0, [a, a, b, b]);
      }
      ctx.fillStyle = warpFill[col] ?? THREADS.gap;
      ctx.fill();
    }
    // Weft floats, one path per pick and colour.
    for (let row = from; row < to; row++) {
      for (const letter of [false, true]) {
        ctx.beginPath();
        for (let col = 0; col < cols; col++) {
          if (at(col, row) === WARP_UP || inLetter(col, row) !== letter) {
            continue;
          }
          const joins = (c: number) =>
            c >= 0 &&
            c < cols &&
            at(c, row) !== WARP_UP &&
            inLetter(c, row) === letter;
          const left = joins(col - 1);
          const right = joins(col + 1);
          const x0 = col * p + (left ? -seam : gap);
          const x1 = (col + 1) * p + (right ? seam : -gap);
          const a = left ? 0 : round;
          const b = right ? 0 : round;
          const inset = letter ? letterSide : side;
          shape(x0, row * p + inset, x1 - x0, p - inset * 2, [a, b, b, a]);
        }
        ctx.fillStyle =
          (letter ? letterFill[row] : groundFill[row]) ?? THREADS.gap;
        ctx.fill();
      }
    }
  };

  if (!animate) {
    drawPicks(0, rows);
    return () => {};
  }

  // The loom, warped: bare threads along the band, then the picks go in.
  ctx.fillStyle = THREADS.gap;
  ctx.fillRect(0, 0, width, height);
  for (let col = 0; col < cols; col++) {
    ctx.fillStyle = warpFill[col] ?? THREADS.gap;
    ctx.fillRect(col * p + p * 0.28, 0, p * 0.44, height);
  }
  let done = 0;
  let raf = 0;
  const start = performance.now();
  const tick = (now: number) => {
    const t = Math.min((now - start) / PICK_DURATION, 1);
    const target = Math.ceil((1 - Math.pow(1 - t, 2.2)) * rows);
    if (target > done) {
      drawPicks(done, target);
      done = target;
    }
    if (done < rows) raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
