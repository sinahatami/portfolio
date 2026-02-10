"use client";

export function TechSphereSectionStatic() {
  return (
    <section className="relative flex min-h-[800px] w-full flex-col items-center justify-center overflow-hidden bg-black py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(to right, #3b82f6 1px, transparent 1px),
                           linear-gradient(to bottom, #3b82f6 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col items-center text-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
              Tech Ecosystem
            </h2>
            <p className="mt-4 max-w-[700px] text-gray-400 md:text-xl">
              My technical orbit. Core technologies and expertise.
            </p>
          </div>
        </div>

        {/* Static Tech Visualization */}
        <div className="mx-auto w-full max-w-5xl">
          <div className="relative mx-auto aspect-square w-full max-w-[500px] overflow-hidden rounded-3xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
            {/* Central Core */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <div className="relative">
                {/* Outer glow */}
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl" />

                {/* Middle ring */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30" />

                {/* Inner core */}
                <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-purple-600">
                  <span className="text-sm font-bold text-white">CORE</span>
                </div>
              </div>
            </div>

            {/* Static Tech Nodes */}
            <div className="absolute inset-0">
              {[
                { name: "React", x: "25%", y: "20%", color: "bg-blue-500" },
                { name: "Next.js", x: "75%", y: "25%", color: "bg-black" },
                {
                  name: "TypeScript",
                  x: "15%",
                  y: "50%",
                  color: "bg-blue-600",
                },
                { name: "Node.js", x: "85%", y: "50%", color: "bg-green-500" },
                { name: "Python", x: "30%", y: "75%", color: "bg-yellow-500" },
                {
                  name: "TensorFlow",
                  x: "70%",
                  y: "75%",
                  color: "bg-orange-500",
                },
                { name: "AWS", x: "50%", y: "15%", color: "bg-yellow-600" },
                { name: "Docker", x: "50%", y: "85%", color: "bg-blue-400" },
              ].map((tech, index) => (
                <div
                  key={tech.name}
                  className={`absolute ${tech.color} flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full`}
                  style={{
                    left: tech.x,
                    top: tech.y,
                    boxShadow: `0 0 20px ${tech.color.replace("bg-", "").replace("-500", "-500/50").replace("-600", "-600/50")}`,
                  }}
                >
                  <span className="px-1 text-center text-xs font-bold text-white">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Connection Lines */}
            <svg
              className="absolute inset-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connect each node to center */}
              {[25, 75, 15, 85, 30, 70, 50, 50].map((xPercent, i) => {
                const yPercent = [20, 25, 50, 50, 75, 75, 15, 85][i];
                return (
                  <line
                    key={i}
                    x1={`${xPercent}%`}
                    y1={`${yPercent}%`}
                    x2="50%"
                    y2="50%"
                    stroke="rgba(59, 130, 246, 0.3)"
                    strokeWidth="1"
                    strokeDasharray="5,5"
                  />
                );
              })}
            </svg>

            {/* Legend */}
            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 transform gap-3 rounded-full bg-black/50 px-4 py-2 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <span className="text-xs text-gray-300">Frontend</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs text-gray-300">Backend</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <span className="text-xs text-gray-300">AI/ML</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mx-auto mt-8 max-w-2xl text-center">
            <p className="text-gray-400">
              This visualization represents my core technology stack and
              expertise areas. Each node represents a technology I'm proficient
              in, with connections showing how they integrate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
