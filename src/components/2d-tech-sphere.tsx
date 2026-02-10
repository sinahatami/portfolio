// --- FILE: ./src/components/2d-tech-sphere.tsx ---
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface SkillNode {
  name: string;
  category: "frontend" | "backend" | "ai" | "devops";
  level: number;
}

export function TechSphere2D() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills = useMemo<SkillNode[]>(
    () => [
      { name: "React/Next.js", category: "frontend", level: 95 },
      { name: "TypeScript", category: "frontend", level: 90 },
      { name: "Node.js", category: "backend", level: 85 },
      { name: "GraphQL", category: "backend", level: 80 },
      { name: "Python", category: "ai", level: 85 },
      { name: "TensorFlow", category: "ai", level: 75 },
      { name: "AWS", category: "devops", level: 80 },
      { name: "Docker", category: "devops", level: 85 },
      { name: "Micro-Frontends", category: "frontend", level: 85 },
      { name: "System Design", category: "backend", level: 85 },
    ],
    []
  );

  return (
    <div className="relative aspect-square w-full max-w-[500px]">
      {/* Background gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-900/20 via-black to-purple-900/20" />

      {/* Skill nodes */}
      <div className="relative h-full w-full">
        {/* Central hub */}
        <div className="absolute top-1/2 left-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="h-full w-full rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20"
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-white">
            Tech Stack
          </div>
        </div>

        {/* Orbiting skills */}
        {skills.map((skill, index) => {
          const angle = (index * 2 * Math.PI) / skills.length;
          const radius = 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const isHovered = hoveredSkill === skill.name;

          return (
            <motion.div
              key={skill.name}
              className="absolute top-1/2 left-1/2 cursor-pointer"
              style={{
                x,
                y,
                marginLeft: -50,
                marginTop: -50,
              }}
              animate={{
                x: x + (isHovered ? Math.cos(angle) * 10 : 0),
                y: y + (isHovered ? Math.sin(angle) * 10 : 0),
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ type: "spring", stiffness: 300 }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => {
                console.log("Clicked skill:", skill.name);
                // You can dispatch an event or update context here
              }}
            >
              <div
                className={`flex h-20 w-20 flex-col items-center justify-center rounded-full p-2 backdrop-blur-sm transition-all ${
                  skill.category === "frontend"
                    ? "border border-blue-500/30 bg-blue-500/20"
                    : skill.category === "backend"
                      ? "border border-green-500/30 bg-green-500/20"
                      : skill.category === "ai"
                        ? "border border-purple-500/30 bg-purple-500/20"
                        : "border border-yellow-500/30 bg-yellow-500/20"
                }`}
              >
                <span className="text-center text-xs font-bold text-white">
                  {skill.name}
                </span>
                <div className="mt-1 h-1 w-12 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full bg-white"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-gray-400">Frontend</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-gray-400">Backend</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-full bg-purple-500" />
          <span className="text-gray-400">AI/ML</span>
        </div>
      </div>
    </div>
  );
}
