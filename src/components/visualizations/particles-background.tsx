"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  const animationRef = useRef<number | null>(null);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [particleCount, setParticleCount] = useState(30);
  const particlesRef = useRef<Particle[]>([]);

  // Calculate optimal particle count
  const getParticleCount = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) return 20;
    if (width < 1024) return 30;
    return 40;
  }, []);

  // Initialize particles
  const initParticles = useCallback(
    (width: number, height: number) => {
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.2 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.3 + 0.1,
      }));
    },
    [particleCount]
  );

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.warn("Canvas 2D not supported");
      return;
    }

    const width = canvas.width;
    const height = canvas.height;
    const particles = particlesRef.current;

    // Clear with fade effect
    ctx.fillStyle =
      theme === "dark" ? "rgba(10, 10, 10, 0.05)" : "rgba(255, 255, 255, 0.05)";
    ctx.fillRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p: any = particles[i];

      // Move particle
      p.x += p.speedX;
      p.y += p.speedY;

      // Bounce off edges
      if (p.x > width || p.x < 0) p.speedX *= -1;
      if (p.y > height || p.y < 0) p.speedY *= -1;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle =
        theme === "dark"
          ? `rgba(59, 130, 246, ${p.opacity})`
          : `rgba(59, 130, 246, ${p.opacity * 0.3})`;
      ctx.fill();

      // Draw connections (optimized - only draw to nearby particles)
      for (let j = i + 1; j < particles.length; j++) {
        const p2: any = particles[j];
        const dx = p2.x - p.x;
        const dy = p2.y - p.y;
        const distance = dx * dx + dy * dy;

        if (distance < 10000) {
          // 100px squared
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle =
            theme === "dark"
              ? `rgba(59, 130, 246, ${p.opacity * 0.08})`
              : `rgba(59, 130, 246, ${p.opacity * 0.04})`;
          ctx.lineWidth = 0.2;
          ctx.stroke();
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [theme]);

  useEffect(() => {
    setMounted(true);
    setParticleCount(getParticleCount());

    const canvas = document.createElement("canvas");
    if (!canvas) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleResize = () => {
      setParticleCount(getParticleCount());
      setCanvasSize();
    };

    setCanvasSize();
    animate();

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, getParticleCount, initParticles]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-60"
      aria-hidden="true"
    />
  );
};
