import { RESUME_DATA } from "@/data/resume-data";
import { ContactForm } from "@/components/features/contact-form";

export const ContactSection = () => {
  return (
    <section
      id="contact"
      className="container mx-auto max-w-5xl scroll-mt-24 px-6 py-12 md:py-24"
    >
      <div className="bg-card/30 relative overflow-hidden rounded-3xl border p-8 backdrop-blur-sm md:p-12">
        <div className="bg-accent/10 absolute top-0 right-0 -z-10 h-[300px] w-[300px] rounded-full blur-[100px]">
          {" "}
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Let's build something scalable.
            </h2>
            <p className="text-muted-foreground max-w-xl text-lg leading-relaxed">
              I'm currently based in Genoa, Italy, and actively looking for a
              roles. Whether you have a question about my stack, a project to
              discuss, or just want to say hi, I'll try my best to get back to
              you!
            </p>
            <div className="flex flex-col gap-4 pt-4">
              <div className="text-muted-foreground flex items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75">
                    {" "}
                  </span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500">
                    {" "}
                  </span>
                </span>
                <span className="text-sm font-medium">
                  Open to new opportunities
                </span>
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
  );
};
