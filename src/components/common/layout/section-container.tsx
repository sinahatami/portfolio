import { ScrollReveal } from "./scroll-reveal";

interface SectionContainerProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const SectionContainer = ({
  children,
  id,
  className = "",
  title,
  subtitle,
}: SectionContainerProps) => {
  return (
    <section id={id} className={`scroll-mt-24 ${className}`}>
      <div className="container mx-auto max-w-5xl px-6 py-12 md:py-20">
        {(title || subtitle) && (
          <ScrollReveal direction="up" delay={0.1}>
            <div className="mb-12 md:mb-16">
              {title && (
                <div className="flex items-center gap-4">
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
                    {title}
                  </h2>
                  <span className="bg-border h-px flex-1"></span>
                </div>
              )}
              {subtitle && (
                <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
                  {subtitle}
                </p>
              )}
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal direction="up" delay={0.2}>
          {children}
        </ScrollReveal>
      </div>
    </section>
  );
};
