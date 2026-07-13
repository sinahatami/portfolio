export const TechSphereFallback2D = () => {
  const skills = [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Python",
    "TensorFlow",
    "AWS",
    "Docker",
  ];

  return (
    <div className="relative aspect-square w-full max-w-[500px]">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes subtle-bounce { 0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; } 50% { transform: translateY(-5px) scale(1.1); opacity: 1; } }
        @keyframes subtle-pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
      `,
        }}
      />
      {/* Background gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />

      {/* Animated orbs */}
      <div className="relative h-full w-full">
        {skills.map((skill, index) => {
          const angle = (index * 2 * Math.PI) / skills.length;
          const radius = 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={skill}
              className="absolute top-1/2 left-1/2"
              style={{
                transform: `translate(${x}px, ${y}px)`,
                marginLeft: -40,
                marginTop: -40,
              }}
            >
              <div
                className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm"
                style={{
                  animation: `subtle-bounce 2s ease-in-out infinite ${index * 0.1}s`,
                }}
              >
                <span className="text-xs font-bold text-white">{skill}</span>
              </div>
            </div>
          );
        })}

        {/* Center sphere */}
        <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2">
          <div
            className="h-full w-full rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30"
            style={{ animation: "subtle-pulse 3s ease-in-out infinite" }}
          />
        </div>
      </div>
    </div>
  );
};
