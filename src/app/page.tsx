import { ContactForm } from "@/components/contact-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RESUME_DATA } from "@/data/resume-data";
import { ArrowUpRight, Code2, Terminal, Cpu } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-24">
      {/* --- WEBSITE HERO SECTION --- */}
      <section className="relative flex flex-col items-start gap-8 pt-8 md:pt-16 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1 space-y-6">
          <Badge
            variant="outline"
            className="animate-in fade-in zoom-in duration-300"
          >
            Open to work • Based in {RESUME_DATA.location}
          </Badge>
          <h1 className="animate-in slide-in-from-bottom-4 text-4xl font-extrabold tracking-tight duration-500 lg:text-6xl">
            Architecting{" "}
            <span className="from-accent bg-gradient-to-r to-teal-500 bg-clip-text text-transparent">
              High-Performance
            </span>{" "}
            Web Applications.
          </h1>
          <p className="text-muted-foreground animate-in slide-in-from-bottom-5 max-w-2xl text-xl leading-relaxed duration-700">
            {RESUME_DATA.summary}
          </p>
          <div className="animate-in slide-in-from-bottom-6 flex gap-4 pt-4 duration-1000">
            <Button size="lg" className="h-12 px-8 text-base" asChild>
              <a href={`mailto:${RESUME_DATA.contact.email}`}>
                Let's Build Together
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base"
              asChild
            >
              <a href={RESUME_DATA.contact.social[0].url} target="_blank">
                View GitHub <GithubIcon className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Hero Visual - Abstract Tech Representation */}
        <div className="relative hidden p-8 lg:block">
          <div className="from-accent/20 absolute inset-0 rounded-full bg-gradient-to-tr to-transparent blur-3xl" />
          <div className="relative grid grid-cols-2 gap-4 opacity-80">
            <div className="bg-card flex items-center gap-3 rounded-xl border p-4 shadow-xl">
              <div className="bg-accent/10 text-accent rounded-lg p-2">
                <Code2 size={24} />
              </div>
              <div className="text-sm font-bold">Clean Code</div>
            </div>
            <div className="bg-card flex translate-y-8 items-center gap-3 rounded-xl border p-4 shadow-xl">
              <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
                <Terminal size={24} />
              </div>
              <div className="text-sm font-bold">DevOps Ready</div>
            </div>
            <div className="bg-card flex items-center gap-3 rounded-xl border p-4 shadow-xl">
              <div className="rounded-lg bg-purple-500/10 p-2 text-purple-500">
                <Cpu size={24} />
              </div>
              <div className="text-sm font-bold">Scalable</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE GRID --- */}
      <section id="experience" className="scroll-mt-24 space-y-8">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Experience</h2>
          <span className="text-muted-foreground hidden font-mono text-sm md:block">
            15+ Years Combined
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {RESUME_DATA.work.map((work) => (
            <div
              key={work.company}
              className="group bg-card/50 hover:bg-accent/5 relative grid gap-4 rounded-2xl border p-6 transition-all md:grid-cols-[200px_1fr]"
            >
              <div className="text-muted-foreground font-mono text-sm">
                {work.start} — {work.end}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="group-hover:text-accent text-lg font-bold transition-colors">
                    {work.company}
                  </h3>
                  {work.link && (
                    <a
                      href={work.link}
                      target="_blank"
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
                <p className="text-foreground/80 font-medium">{work.title}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {work.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {work.badges.map((b) => (
                    <Badge key={b} variant="secondary" className="text-xs">
                      {b}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURED PROJECTS (CARDS) --- */}
      <section id="projects" className="scroll-mt-24 space-y-8">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-3xl font-bold tracking-tight">Featured Work</h2>
          <Button variant="link" asChild>
            <a href={RESUME_DATA.contact.social[0].url} target="_blank">
              View all on GitHub
            </a>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {RESUME_DATA.projects.map((project) => (
            <Card
              key={project.title}
              className="group hover:border-accent/50 flex flex-col justify-between transition-all hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {project.title}
                  </Link>

                  <a
                    href={project.link.href}
                    target="_blank"
                    className="text-muted-foreground hover:text-accent opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <ArrowUpRight size={20} />
                  </a>
                </CardTitle>
                <CardDescription className="font-mono text-xs">
                  {project.techStack.join(" • ")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* --- SKILLS TICKER (Visual Break) --- */}
      <section id="about" className="space-y-8">
        <h2 className="text-2xl font-bold tracking-tight">Technical Arsenal</h2>
        <div className="flex flex-wrap gap-3">
          {RESUME_DATA.skills.map((skill) => (
            <div
              key={skill}
              className="bg-secondary/20 text-secondary-foreground hover:bg-accent hover:text-accent-foreground cursor-default rounded-lg border px-4 py-2 font-mono text-sm transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="scroll-mt-24 space-y-8 pb-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Get in Touch</h2>
            <p className="text-muted-foreground text-lg">
              Interested in my architecture experience? Let's discuss how I can
              help your team build scalable solutions.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}

// Helper component for GitHub Icon
function GithubIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0 3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}
