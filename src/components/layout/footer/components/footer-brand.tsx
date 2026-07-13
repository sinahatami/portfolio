import { RESUME_DATA } from "@/data/resume-data";

export function FooterBrand() {
  return (
    <div className="group flex flex-col items-center gap-4">
      <div className="flex items-center gap-3 transition-transform duration-300 group-hover:scale-110">
        <div className="from-accent shadow-accent/20 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br to-blue-600 shadow-lg">
          <span className="text-lg font-bold text-white">
            {RESUME_DATA.initials || "SH"}
          </span>
        </div>
        <span className="text-2xl font-bold tracking-tight">
          {RESUME_DATA.name}
        </span>
      </div>
    </div>
  );
}
