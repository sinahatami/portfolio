"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(30);

  useEffect(() => {
    setMounted(true);

    // Adjust particle count based on screen size
    const updateParticleCount = () => {
      const count = Math.min(30, Math.floor(window.innerWidth / 40));
      setParticleCount(count);
    };

    updateParticleCount();
    window.addEventListener("resize", updateParticleCount);
    return () => window.removeEventListener("resize", updateParticleCount);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      // Clear with fade effect
      ctx.fillStyle =
        theme === "dark"
          ? "rgba(10, 10, 10, 0.05)"
          : "rgba(255, 255, 255, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Move particle
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off edges
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX *= -1;
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY *= -1;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle =
          theme === "dark"
            ? `rgba(59, 130, 246, ${particle.opacity})`
            : `rgba(59, 130, 246, ${particle.opacity * 0.5})`;
        ctx.fill();

        // Draw connections (sparse for performance)
        for (let j = i + 1; j < particles.length; j += 3) {
          const otherParticle = particles[j];
          const dx = otherParticle.x - particle.x;
          const dy = otherParticle.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle =
              theme === "dark"
                ? `rgba(59, 130, 246, ${particle.opacity * 0.2})`
                : `rgba(59, 130, 246, ${particle.opacity * 0.1})`;
            ctx.lineWidth = 0.3;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mounted, theme, particleCount]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-50"
      aria-hidden="true"
    />
  );
};
