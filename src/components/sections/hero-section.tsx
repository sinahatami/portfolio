import { Badge, Button } from "@/components/ui";
import { RESUME_DATA } from "@/data/resume-data";
import { Github, Sparkles, ChevronRight, MapPin, Calendar } from "@/lib/icons";
import { HeroAvatar } from "./hero-avatar";

export const HeroSection = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 pt-12 pb-20 md:pt-32 md:pb-32"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-accent/5 absolute top-0 -left-[10%] h-[300px] w-[300px] rounded-full blur-3xl md:-left-32 md:h-[500px] md:w-[500px]" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-3xl md:-right-32 md:h-[500px] md:w-[500px]" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col-reverse gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* LEFT CONTENT */}
          <div className="flex flex-col items-start gap-6 md:gap-8">
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
                className="group bg-accent shadow-accent/25 hover:bg-accent/90 w-full font-semibold text-slate-900 shadow-lg sm:w-auto"
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
                className="group hover:bg-accent/10 hover:border-accent hover:text-accent w-full border-2 sm:w-auto"
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
          </div>

          {/* RIGHT CONTENT: AVATAR */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <HeroAvatar />
          </div>
        </div>
      </div>
    </section>
  );
};
