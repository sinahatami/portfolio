"use client";

import { motion } from "framer-motion";
import { TechSphere2D } from "../visualizations/2d-tech-sphere";

export function TechSphereSection() {
  return (
    <section className="relative flex min-h-[800px] w-full flex-col items-center justify-center overflow-hidden bg-black py-24">
      {/* 1. Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black" />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* 2. Text Content */}
        <div className="mb-12 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto flex w-full max-w-5xl items-center justify-center"
          >
            <TechSphere2D />
          </motion.div>
        </div>

        {/* 3. SIMPLE 2D VERSION - Replace the 3D component */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mx-auto flex w-full max-w-5xl items-center justify-center"
        >
          <div className="relative aspect-square w-full max-w-[500px] overflow-hidden rounded-2xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
            {/* Central sphere (CSS only) */}
            <div className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-blue-500/30 blur-xl" />

            <div className="absolute top-1/2 left-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />

            {/* Orbiting tech labels */}
            {[
              {
                name: "React",
                color: "text-blue-400",
                position: "top-1/4 left-1/4",
              },
              {
                name: "TypeScript",
                color: "text-blue-500",
                position: "top-1/3 right-1/4",
              },
              {
                name: "Next.js",
                color: "text-white",
                position: "bottom-1/3 left-1/4",
              },
              {
                name: "Node.js",
                color: "text-green-500",
                position: "bottom-1/4 right-1/3",
              },
              {
                name: "Python",
                color: "text-yellow-500",
                position: "top-1/2 right-1/6",
              },
              {
                name: "TensorFlow",
                color: "text-orange-500",
                position: "top-1/2 left-1/6",
              },
              {
                name: "AWS",
                color: "text-yellow-600",
                position: "bottom-1/3 right-1/3",
              },
              {
                name: "Docker",
                color: "text-blue-300",
                position: "top-1/4 left-1/2",
              },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                className={`absolute ${tech.position} rounded-full bg-gray-900/50 px-4 py-2 backdrop-blur-sm`}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.2,
                  repeat: Infinity,
                }}
              >
                <span className={`text-sm font-bold ${tech.color}`}>
                  {tech.name}
                </span>
              </motion.div>
            ))}

            {/* Connection lines */}
            <svg
              className="absolute inset-0 h-full w-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i * Math.PI * 2) / 8;
                const x1 = 250 + Math.cos(angle) * 100;
                const y1 = 250 + Math.sin(angle) * 100;
                const x2 = 250 + Math.cos(angle + Math.PI / 4) * 100;
                const y2 = 250 + Math.sin(angle + Math.PI / 4) * 100;

                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(59, 130, 246, 0.2)"
                    strokeWidth="1"
                  />
                );
              })}
            </svg>

            {/* Overlay message for debugging */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1 text-xs text-gray-400">
              3D Tech Sphere (Debug Mode)
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
