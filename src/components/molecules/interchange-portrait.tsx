import Image from "next/image";
import { cn } from "@/lib/utils";

type Lane = "industry" | "research" | "study";

const COLOR: Record<Lane, string> = {
  industry: "var(--color-lane-industry)",
  research: "var(--color-lane-research)",
  study: "var(--color-lane-study)",
};

/*
 * Geometry in a 100×100 box centred on the portrait. The three lines arrive
 * in parallel from the right edge and bend 45° into the interchange; each
 * is drawn from the edge inwards so the load animation runs towards the
 * person.
 */
const LINES: { lane: Lane; d: string; delay: number }[] = [
  { lane: "research", d: "M 700 -20 H 80 L 50 10 V 50", delay: 0 },
  { lane: "industry", d: "M 700 50 H 50", delay: 120 },
  { lane: "study", d: "M 700 120 H 80 L 50 90 V 50", delay: 240 },
];

const RING_RADIUS = 46;
const GAP_DEGREES = 7;

/* Ring arcs face the line each one meets: research up, industry right, study down. */
const ARCS: { lane: Lane; from: number; to: number }[] = [
  { lane: "research", from: 180, to: 315 },
  { lane: "industry", from: 315, to: 405 },
  { lane: "study", from: 45, to: 180 },
];

function arcPath(from: number, to: number) {
  const point = (degrees: number) => {
    const radians = (degrees * Math.PI) / 180;
    return [
      50 + RING_RADIUS * Math.cos(radians),
      50 + RING_RADIUS * Math.sin(radians),
    ].map((value) => value.toFixed(2));
  };
  const [x1, y1] = point(from + GAP_DEGREES / 2);
  const [x2, y2] = point(to - GAP_DEGREES / 2);
  const large = to - from - GAP_DEGREES > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${RING_RADIUS} ${RING_RADIUS} 0 ${large} 1 ${x2} ${y2}`;
}

interface InterchangePortraitProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * The portrait as an interchange station: the industry, research and study
 * lines run in from the edge of the board and meet in a three-colour ring
 * around the photo. Lines and ring draw in once on load (motion-safe).
 */
export function InterchangePortrait({
  src,
  alt,
  className,
}: InterchangePortraitProps) {
  return (
    <div className={cn("relative aspect-square", className)}>
      {/* Light from the interchange */}
      <div
        aria-hidden
        className="absolute -inset-[30%] rounded-full bg-[radial-gradient(circle,rgb(61_157_240/0.32)_0%,rgb(61_157_240/0.08)_40%,transparent_68%)]"
      />

      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full overflow-visible"
      >
        <defs>
          <filter
            id="interchange-glow"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
        </defs>
        {LINES.map((line) => (
          <g key={line.lane}>
            <path
              d={line.d}
              pathLength={1}
              strokeDasharray="1"
              fill="none"
              stroke={COLOR[line.lane]}
              strokeWidth={5}
              strokeLinejoin="round"
              opacity={0.55}
              filter="url(#interchange-glow)"
              className="motion-safe:animate-draw"
              style={{ animationDelay: `${line.delay}ms` }}
            />
            <path
              d={line.d}
              pathLength={1}
              strokeDasharray="1"
              fill="none"
              stroke={COLOR[line.lane]}
              strokeWidth={3.6}
              strokeLinejoin="round"
              className="motion-safe:animate-draw"
              style={{ animationDelay: `${line.delay}ms` }}
            />
          </g>
        ))}
      </svg>

      <div className="bg-board absolute inset-[7%] overflow-hidden rounded-full">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 300px, 160px"
          className="object-cover object-[50%_35%]"
        />
      </div>

      <svg
        aria-hidden
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full overflow-visible"
      >
        {ARCS.map((arc) => (
          <path
            key={arc.lane}
            d={arcPath(arc.from, arc.to)}
            pathLength={1}
            strokeDasharray="1"
            fill="none"
            stroke={COLOR[arc.lane]}
            strokeWidth={4.2}
            strokeLinecap="round"
            className="motion-safe:animate-draw"
            style={{ animationDelay: "650ms" }}
          />
        ))}
      </svg>
    </div>
  );
}
