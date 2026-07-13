import { HeroAvatar } from "./hero-avatar";
import { HeroContent } from "./hero-content";

export const HeroSection = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden px-6 pt-28 pb-20 md:pt-32 md:pb-32"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-accent/5 absolute top-0 -left-[10%] h-[300px] w-[300px] rounded-full blur-3xl md:-left-32 md:h-[500px] md:w-[500px]" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-3xl md:-right-32 md:h-[500px] md:w-[500px]" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col-reverse gap-12 lg:grid lg:grid-cols-2 lg:items-center lg:gap-20">
          <HeroContent />

          {/* RIGHT CONTENT: AVATAR */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <HeroAvatar />
          </div>
        </div>
      </div>
    </section>
  );
};
