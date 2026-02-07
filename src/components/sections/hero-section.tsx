"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import { Github, Sparkles, ChevronRight, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { OptimizedImage } from "../ui/optimized-image";

export const HeroSection = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 pt-24 pb-24 md:pt-32"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="from-accent/10 absolute top-1/4 -left-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r via-blue-500/10 to-purple-500/10 blur-3xl" />
        <div className="to-accent/10 absolute -right-1/4 -bottom-1/4 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-purple-500/10 via-blue-500/10 blur-3xl" />
        <div className="bg-grid-pattern absolute inset-0 opacity-[0.02]" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="border-accent/30 bg-accent/5 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
              >
                <Sparkles className="h-3 w-3" />
                Senior Software Engineer
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Genoa, Italy
                </span>
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-green-500" />
              </Badge>

              <h1 className="text-4xl leading-tight font-bold tracking-tight md:text-6xl lg:text-7xl">
                <span className="text-gradient-primary">Bridging</span>
                <br />
                <span className="text-foreground">Software</span> &{" "}
                <span className="text-gradient-accent">Data</span>
                <span className="text-foreground">.</span>
              </h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-muted-foreground text-xl leading-relaxed"
            >
              {RESUME_DATA.summary}
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-6 pt-4"
            >
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 flex h-12 w-12 items-center justify-center rounded-xl">
                  <Calendar className="text-accent h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">5+</div>
                  <div className="text-muted-foreground text-sm">
                    Years Experience
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10">
                  <Github className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-muted-foreground text-sm">Projects</div>
                </div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-8"
            >
              <Button
                size="lg"
                className="group bg-accent hover:bg-accent/90 px-8 py-6 text-base font-semibold text-white shadow-lg transition-all hover:shadow-xl"
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
                className="hover:border-accent group border-2 px-8 py-6 text-base font-semibold"
                asChild
              >
                <a
                  href={RESUME_DATA.contact.social[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub
                  <Github className="ml-2 h-4 w-4 transition-transform group-hover:scale-110" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right - Avatar */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 z-10">
              <Badge className="animate-float bg-accent text-accent-foreground px-4 py-2 shadow-lg">
                <Sparkles className="mr-2 h-3 w-3" />
                Available for Work
              </Badge>
            </div>

            <div className="absolute -bottom-6 -left-6 z-10">
              <Badge
                variant="secondary"
                className="animate-float px-4 py-2 shadow-lg"
                style={{ animationDelay: "1s" }}
              >
                React • Next.js • AI/ML
              </Badge>
            </div>

            {/* Main Image Container */}
            <div className="relative">
              {/* Glow effect */}
              <div className="from-accent/20 absolute -inset-4 rounded-3xl bg-gradient-to-r via-blue-500/20 to-purple-500/20 blur-xl" />

              {/* Image with elegant border */}
              <div className="border-background relative overflow-hidden rounded-2xl border-8 shadow-2xl">
                <OptimizedImage
                  src={RESUME_DATA.avatarUrl}
                  alt="Sina Hatami"
                  width={500}
                  height={600}
                  className="h-auto w-full object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Gradient overlay */}
                <div className="from-background/30 absolute inset-0 bg-gradient-to-t via-transparent to-transparent" />
              </div>

              {/* Decorative corners */}
              <div className="border-accent absolute -top-4 -left-4 h-8 w-8 rounded-tl-lg border-t-2 border-l-2" />
              <div className="border-accent absolute -top-4 -right-4 h-8 w-8 rounded-tr-lg border-t-2 border-r-2" />
              <div className="border-accent absolute -bottom-4 -left-4 h-8 w-8 rounded-bl-lg border-b-2 border-l-2" />
              <div className="border-accent absolute -right-4 -bottom-4 h-8 w-8 rounded-br-lg border-r-2 border-b-2" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
