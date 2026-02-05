import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { Github } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section
      id="about"
      className="container mx-auto max-w-6xl px-6 pt-12 pb-24 md:pt-24 lg:pt-32"
    >
      <div className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:gap-24">
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <Badge
            variant="outline"
            className="animate-in fade-in zoom-in border-accent/20 bg-accent/5 text-foreground/80 duration-300"
          >
            <span className="relative mr-2 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Open to work • Genoa, Italy
          </Badge>

          <h1 className="animate-in slide-in-from-bottom-4 text-4xl font-extrabold tracking-tight duration-500 lg:text-7xl">
            Bridging <br />
            <span className="from-accent bg-gradient-to-r to-emerald-400 bg-clip-text text-transparent">
              Software
            </span>{" "}
            &
            <span className="bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
              {" "}
              Data
            </span>
            .
          </h1>

          <p className="text-muted-foreground animate-in slide-in-from-bottom-5 mx-auto max-w-2xl text-xl leading-relaxed duration-700 lg:mx-0">
            {RESUME_DATA.summary}
          </p>

          <div className="animate-in slide-in-from-bottom-6 flex flex-wrap justify-center gap-4 pt-4 duration-1000 lg:justify-start">
            <Button
              size="lg"
              className="shadow-accent/20 bg-accent hover:bg-accent/90 text-accent-foreground h-12 px-8 text-base font-semibold shadow-lg"
              asChild
            >
              <a href="#contact">Contact Me</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-background h-12 px-8 text-base"
              asChild
            >
              <a href={RESUME_DATA.contact.social[0].url} target="_blank">
                GitHub <Github className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="animate-in fade-in zoom-in relative delay-200 duration-1000">
          <div className="from-accent absolute inset-0 rounded-full bg-gradient-to-tr to-blue-500 opacity-20 blur-[80px]"></div>
          <div className="border-background relative h-64 w-64 rotate-3 overflow-hidden rounded-[2rem] border-4 shadow-2xl transition-transform duration-500 hover:rotate-0 md:h-80 md:w-80">
            <Image
              src={RESUME_DATA.avatarUrl}
              alt="Sina Hatami"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
