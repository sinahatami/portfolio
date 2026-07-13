"use client";

import { useState } from "react";
import { Badge } from "@/components/ui";
import { Sparkles, Code2 } from "@/lib/icons";
import { OptimizedImage } from "../ui/optimized-image";
import { RESUME_DATA } from "@/data/resume-data";

export const HeroAvatar = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group relative w-[280px] perspective-[1000px] md:w-[400px]"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Floating Badges */}
      {!isFlipped && (
        <>
          {/* Top Right Badge */}
          <div className="absolute -top-6 -right-4 z-20 hidden md:block">
            <Badge className="bg-accent shadow-accent/20 ring-background border-none px-4 py-2 text-white shadow-xl ring-4">
              <div className="flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" />
                <span className="text-sm font-semibold">Open to work</span>
              </div>
            </Badge>
          </div>

          {/* Bottom Left Badge */}
          <div className="absolute -bottom-6 -left-4 z-20 hidden md:block">
            <Badge
              variant="secondary"
              className="ring-background px-4 py-2 shadow-xl ring-4"
            >
              <div className="flex items-center gap-2 text-sm">
                <Code2 className="h-3.5 w-3.5" />
                TypeScript • Python
              </div>
            </Badge>
          </div>
        </>
      )}

      {/* 3D Flip Card */}
      <div
        className="relative h-[280px] w-[280px] cursor-pointer md:h-[400px] md:w-[400px]"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transition: "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="border-background bg-background absolute inset-0 h-full w-full overflow-hidden rounded-[2rem] border-[8px] shadow-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <OptimizedImage
            src={RESUME_DATA.avatarUrl}
            alt={RESUME_DATA.name}
            width={400}
            height={400}
            priority={true}
            className="h-full w-full object-cover"
          />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" />
        </div>

        {/* BACK SIDE */}
        <div
          className="border-background absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-[2rem] border-[8px] bg-slate-900 p-8 text-center shadow-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <Code2 className="text-accent h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-white">
            {RESUME_DATA.name}
          </h2>
          <div className="bg-accent mt-2 h-1 w-12 rounded-full" />
          <p className="mt-4 font-mono text-sm text-slate-300">
            {RESUME_DATA.position}
          </p>
          <p className="mt-6 text-xs font-medium tracking-widest text-slate-400 uppercase">
            Based in {RESUME_DATA.location}
          </p>
        </div>
      </div>

      {/* Decorative Background Blob */}
      <div className="from-accent/30 absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr to-blue-500/30 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
    </div>
  );
};
