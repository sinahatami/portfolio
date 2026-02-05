import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ContactForm } from "@/components/contact-form";
import { ExpandableList } from "@/components/expandable-list";
import { RESUME_DATA } from "@/data/resume-data";
import {
  ArrowUpRight,
  Github,
  Code2,
  BrainCircuit,
  GraduationCap,
  Link as LinkIcon,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Page() {
  return (
    <div className="selection:bg-accent/30 relative overflow-hidden">
      {/* GLOBAL BACKGROUND: Cleaner, more professional Mesh Gradient */}
      <div className="bg-background fixed inset-0 -z-10 h-full w-full">
        <div className="absolute top-0 right-0 left-0 h-[500px] bg-[radial-gradient(circle_800px_at_50%_-100px,#10b98115,transparent)]"></div>
        <div className="absolute right-0 bottom-0 h-[500px] w-[500px] bg-[radial-gradient(circle_800px_at_100%_200px,#3b82f610,transparent)]"></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="container mx-auto max-w-6xl px-6 pt-12 pb-24 md:pt-24 lg:pt-32">
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
              Senior Engineer & Data Scientist. I build high-performance web
              applications powered by intelligent data systems.
            </p>

            <div className="animate-in slide-in-from-bottom-6 flex flex-wrap justify-center gap-4 pt-4 duration-1000 lg:justify-start">
              {/* FIX 8: Contact Button Color */}
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
                src="/profile.jpg"
                alt="Sina Hatami"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section
        id="experience"
        className="container mx-auto max-w-5xl scroll-mt-24 px-6 py-12 md:py-20"
      >
        <h2 className="mb-12 flex items-center gap-4 text-3xl font-bold tracking-tight">
          Experience <span className="bg-border h-px flex-1"></span>
        </h2>

        <ExpandableList
          initialCount={3}
          items={RESUME_DATA.work.map((work) => (
            <SpotlightCard
              key={work.company}
              className="group grid items-start gap-6 p-6 md:grid-cols-[200px_1fr] md:p-8"
            >
              <div className="text-muted-foreground font-mono text-sm md:pt-1">
                {work.start} — {work.end}
              </div>
              <div className="space-y-4">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="group-hover:text-accent text-xl font-bold transition-colors">
                        {work.company}
                      </h3>
                      {/* FIX 5: Company Link */}
                      {work.link && (
                        <a
                          href={work.link}
                          target="_blank"
                          className="text-muted-foreground hover:text-accent transition-colors"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                    {/* FIX 5: Company Summary */}
                    {work.summary && (
                      <p className="text-muted-foreground text-sm italic">
                        {work.summary}
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-foreground text-lg font-medium">
                  {work.title}
                </p>
                <p className="text-muted-foreground border-border border-l-2 pl-4 text-sm leading-relaxed md:text-base">
                  {work.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {work.badges.map((b) => (
                    <Badge
                      key={b}
                      variant="secondary"
                      className="bg-secondary/50 text-xs font-normal"
                    >
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          ))}
        />
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section
        id="projects"
        className="container mx-auto max-w-5xl scroll-mt-24 px-6 py-12 md:py-20"
      >
        <h2 className="mb-12 flex items-center gap-4 text-3xl font-bold tracking-tight">
          Featured Work <span className="bg-border h-px flex-1"></span>
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {RESUME_DATA.projects.map((project) => (
            <SpotlightCard
              key={project.title}
              className="group flex h-full flex-col"
            >
              <CardHeader className="p-6">
                <CardTitle className="flex items-center justify-between text-xl">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {project.title}
                  </Link>
                  <a
                    href={project.link.href}
                    target="_blank"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Github size={18} />
                  </a>
                </CardTitle>
                <CardDescription className="pt-2 font-mono text-xs">
                  {project.techStack.join(" • ")}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-6 pt-0">
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* --- FIX 6: EDUCATION SECTION (ADDED) --- */}
      <section
        id="education"
        className="container mx-auto max-w-5xl px-6 py-12"
      >
        <h2 className="mb-12 flex items-center gap-4 text-3xl font-bold tracking-tight">
          Education <span className="bg-border h-px flex-1"></span>
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {RESUME_DATA.education.map((edu) => (
            <SpotlightCard key={edu.school} className="flex flex-col gap-4 p-6">
              <div className="flex items-start justify-between">
                <div className="bg-secondary rounded-lg p-2">
                  <GraduationCap className="text-accent h-6 w-6" />
                </div>
                <span className="text-muted-foreground font-mono text-xs">
                  {edu.start} - {edu.end}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-bold">{edu.school}</h3>
                <p className="text-accent text-sm font-medium">{edu.degree}</p>
              </div>
              {edu.notes && (
                <p className="text-muted-foreground border-border/50 mt-auto border-t pt-2 text-sm">
                  {edu.notes}
                </p>
              )}
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* --- SKILLS SECTION (SPLIT) --- */}
      <section id="skills" className="container mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xl font-bold">
              <div className="bg-accent/10 text-accent rounded-lg p-2">
                <Code2 size={24} />
              </div>
              Software Engineering
            </div>
            <div className="flex flex-wrap gap-2">
              {RESUME_DATA.skills[0].items.map((skill) => (
                <div
                  key={skill}
                  className="bg-background hover:border-accent/50 cursor-default rounded-md border px-3 py-1.5 font-mono text-sm shadow-sm transition-colors"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-3 text-xl font-bold">
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
                <BrainCircuit size={24} />
              </div>
              Data Science & AI
            </div>
            <div className="flex flex-wrap gap-2">
              {RESUME_DATA.skills[1].items.map((skill) => (
                <div
                  key={skill}
                  className="bg-background cursor-default rounded-md border px-3 py-1.5 font-mono text-sm shadow-sm transition-colors hover:border-blue-500/50"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section
        id="contact"
        className="container mx-auto max-w-5xl scroll-mt-24 px-6 py-12 md:py-24"
      >
        <div className="bg-card/30 relative overflow-hidden rounded-3xl border p-8 backdrop-blur-sm md:p-12">
          <div className="bg-accent/10 absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full blur-[100px]"></div>

          <div className="grid items-start gap-12 lg:grid-cols-[1fr_400px]">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                Ready to collaborate?
              </h2>
              <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
                I bridge the gap between complex data and intuitive user
                interfaces. Let's discuss how we can build the next generation
                of web applications together.
              </p>
              <div className="flex flex-col gap-4 pt-4">
                <div className="text-muted-foreground flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                  </span>
                  Available for Full-time & Freelance
                </div>
                <a
                  href={`mailto:${RESUME_DATA.contact.email}`}
                  className="hover:text-accent text-xl font-medium transition-colors"
                >
                  {RESUME_DATA.contact.email}
                </a>
              </div>
            </div>

            <div className="bg-background/50 w-full rounded-2xl border p-6 shadow-lg backdrop-blur-md">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
