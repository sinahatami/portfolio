"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import {
  Github,
  Sparkles,
  ChevronRight,
  MapPin,
  Calendar,
  Code2,
} from "@/lib/icons";
import { OptimizedImage } from "../ui/optimized-image";

export const HeroSection = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Text reveal animation inside the badges
  const slipVariants: Variants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "circOut",
        delay: 0.8,
      },
    },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 pt-12 pb-20 md:pt-32 md:pb-32"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-accent/5 absolute top-0 -left-[10%] h-[300px] w-[300px] rounded-full blur-3xl md:-left-32 md:h-[500px] md:w-[500px]" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-3xl md:-right-32 md:h-[500px] md:w-[500px]" />
        {/* <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" /> */}
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col-reverse gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start gap-6 md:gap-8"
          >
            {/* Status Bar */}
            <div className="flex flex-wrap items-center gap-3">
              <Badge
                variant="outline"
                className="border-accent/20 bg-accent/5 hover:bg-accent/10 inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium transition-colors"
              >
                <Sparkles className="text-accent h-3.5 w-3.5" />
                <span>{RESUME_DATA.position}</span>
              </Badge>

              <a
                href={RESUME_DATA.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group text-muted-foreground hover:text-accent inline-flex items-center gap-1.5 text-sm transition-colors"
              >
                <MapPin className="group-hover:text-accent h-3.5 w-3.5 transition-colors" />
                {RESUME_DATA.location}
              </a>

              <div className="flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-2 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                <span className="text-[10px] font-medium text-green-600 dark:text-green-400">
                  Online
                </span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl leading-[1.1] font-extrabold tracking-tight md:text-5xl lg:text-7xl">
              <span className="text-foreground">Engineering</span> <br />
              <span className="from-accent bg-gradient-to-r to-blue-500 bg-clip-text text-transparent">
                Interfaces
              </span>{" "}
              <span className="text-foreground">&</span> <br />
              <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                Intelligence
              </span>
              <span className="text-accent">.</span>
            </h1>

            {/* Summary */}
            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed md:text-xl">
              {RESUME_DATA.summary}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 pt-2 md:gap-8">
              <div className="border-border/50 bg-background/50 flex items-center gap-3 rounded-2xl border p-3 backdrop-blur-sm">
                <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-xl md:h-12 md:w-12">
                  <Calendar className="text-accent h-5 w-5 md:h-6 md:w-6" />
                </div>
                <div>
                  <div className="text-xl font-bold md:text-2xl">
                    {RESUME_DATA.yearsExperience}
                  </div>
                  <div className="text-muted-foreground text-xs md:text-sm">
                    Years Exp.
                  </div>
                </div>
              </div>
              <div className="border-border/50 bg-background/50 flex items-center gap-3 rounded-2xl border p-3 backdrop-blur-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 md:h-12 md:w-12">
                  <Github className="h-5 w-5 text-blue-500 md:h-6 md:w-6" />
                </div>
                <div>
                  <div className="text-xl font-bold md:text-2xl">
                    {RESUME_DATA.numberOfProjects}
                  </div>
                  <div className="text-muted-foreground text-xs md:text-sm">
                    Projects
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex w-full flex-col gap-3 pt-4 sm:flex-row">
              <Button
                size="lg"
                className="group bg-accent shadow-accent/25 hover:bg-accent/90 w-full text-white shadow-lg sm:w-auto"
                asChild
              >
                <a href="#contact">
                  Get in Touch
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group hover:border-accent hover:text-accent w-full border-2 sm:w-auto"
                asChild
              >
                <a
                  href={RESUME_DATA.contact.social.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub
                  <Github className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* RIGHT CONTENT: AVATAR */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative w-[280px] perspective-[1000px] md:w-[400px]"
              onClick={() => setIsFlipped(!isFlipped)}
            >
              {/* Floating Badges */}
              <AnimatePresence>
                {!isFlipped && (
                  <>
                    {/* Top Right Badge - Floats Up/Down */}
                    <motion.div
                      initial={{ opacity: 0, y: 10, x: 10 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: [0, -10, 0], // CONTINUOUS FLOATING ANIMATION RESTORED
                      }}
                      transition={{
                        y: {
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                        opacity: { duration: 0.5 },
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -top-6 -right-4 z-20 hidden md:block"
                    >
                      <Badge className="bg-accent shadow-accent/20 ring-background border-none px-4 py-2 text-white shadow-xl ring-4">
                        <motion.div
                          variants={slipVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex items-center gap-1.5"
                        >
                          <Sparkles className="h-3.5 w-3.5" />
                          <span className="text-sm font-semibold">
                            Open to work
                          </span>
                        </motion.div>
                      </Badge>
                    </motion.div>

                    {/* Bottom Left Badge - Floats Down/Up (Counter-movement) */}
                    <motion.div
                      initial={{ opacity: 0, y: -10, x: -10 }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        y: [0, 10, 0], // CONTINUOUS FLOATING ANIMATION RESTORED
                      }}
                      transition={{
                        y: {
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5,
                        },
                        opacity: { duration: 0.5 },
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -bottom-6 -left-4 z-20 hidden md:block"
                    >
                      <Badge
                        variant="secondary"
                        className="ring-background px-4 py-2 shadow-xl ring-4"
                      >
                        <motion.div
                          variants={slipVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex items-center gap-2 text-sm"
                        >
                          <Code2 className="h-3.5 w-3.5" />
                          TypeScript • Python
                        </motion.div>
                      </Badge>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* 3D Flip Card */}
              <motion.div
                className="relative h-[280px] w-[280px] cursor-pointer md:h-[400px] md:w-[400px]"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
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
                  <h3 className="text-3xl font-bold tracking-tight text-white">
                    {RESUME_DATA.name}
                  </h3>
                  <div className="bg-accent mt-2 h-1 w-12 rounded-full" />
                  <p className="mt-4 font-mono text-sm text-slate-300">
                    {RESUME_DATA.position}
                  </p>
                  <p className="mt-6 text-xs font-medium tracking-widest text-slate-500 uppercase">
                    Based in {RESUME_DATA.location}
                  </p>
                </div>
              </motion.div>

              {/* Decorative Background Blob */}
              <div className="from-accent/30 absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-tr to-blue-500/30 opacity-60 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
