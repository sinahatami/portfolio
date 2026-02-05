import { RESUME_DATA } from "@/data/resume-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, Globe } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Generate Metadata for SEO automatically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = RESUME_DATA.projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Case Study`,
    description: project.description,
  };
}

// 2. Tell Next.js which pages to build at compile time (SSG)
export async function generateStaticParams() {
  return RESUME_DATA.projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = RESUME_DATA.projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="animate-in fade-in mx-auto max-w-3xl space-y-12 duration-500">
      {/* Navigation Back */}
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="text-muted-foreground hover:text-foreground -ml-2"
        >
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Overview
          </Link>
        </Button>
      </div>

      {/* Header */}
      <div className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">
          {project.title}
        </h1>
        <p className="text-muted-foreground text-xl leading-relaxed font-light">
          {project.content.tagline}
        </p>

        {/* Quick Stats / Tech */}
        <div className="border-border flex flex-wrap gap-2 border-y py-6">
          {project.techStack.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="rounded-sm py-1 text-sm"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          <Button asChild>
            <a href={project.link.href} target="_blank">
              <Github className="mr-2 h-4 w-4" /> View Source
            </a>
          </Button>
          {/* If you had a live link, you'd add it here */}
        </div>
      </div>

      {/* Case Study Content */}
      <div className="text-muted-foreground grid gap-12 text-lg leading-relaxed">
        <section className="space-y-4">
          <h2 className="text-foreground text-2xl font-bold">The Challenge</h2>
          <p>{project.content.challenge}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-foreground text-2xl font-bold">The Solution</h2>
          <p>{project.content.solution}</p>
        </section>

        <section className="space-y-4">
          <h2 className="text-foreground text-2xl font-bold">Key Highlights</h2>
          <ul className="marker:text-accent list-disc space-y-2 pl-5">
            {project.content.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
