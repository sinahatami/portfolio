"use client";

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";
import * as THREE from "three";
import { RESUME_DATA } from "@/data/resume-data";
import { SKILL_DETAILS } from "@/data/skill-details";

const TECH_SPHERE_CONFIG = {
  TOTAL_SPHERES: 8,
  SPHERE_RADIUS: 0.35,
  ORBIT_RADIUS: 2.5,
  ROTATION_SPEED: 0.002,
  CAMERA_POSITION: [0, 0, 5] as [number, number, number],
  CAMERA_FOV: 50,
} as const;

const SKILL_COLORS: Record<string, string> = {
  React: "#61DAFB",
  TypeScript: "#3178C6",
  "Next.js": "#000000",
  "Node.js": "#339933",
  Python: "#3776AB",
  TensorFlow: "#FF6F00",
  AWS: "#FF9900",
  Docker: "#2496ED",
  GraphQL: "#E10098",
};

function TechSphere3D() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isAnyHovered, setIsAnyHovered] = useState(false);

  const getSkillColor = useCallback((skillName: string): string => {
    const match = Object.entries(SKILL_COLORS).find(([key]) =>
      skillName.toLowerCase().includes(key.toLowerCase())
    );
    return match ? match[1] : "#3b82f6";
  }, []);

  const allSkills = useMemo(() => {
    return [
      ...(RESUME_DATA.skills[0]?.items ?? []),
      ...(RESUME_DATA.skills[1]?.items ?? []),
    ].slice(0, TECH_SPHERE_CONFIG.TOTAL_SPHERES);
  }, []);

  const spherePositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const numPoints = allSkills.length;
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      positions.push(
        new THREE.Vector3(
          Math.cos(theta) * radiusAtY * TECH_SPHERE_CONFIG.ORBIT_RADIUS,
          y * TECH_SPHERE_CONFIG.ORBIT_RADIUS,
          Math.sin(theta) * radiusAtY * TECH_SPHERE_CONFIG.ORBIT_RADIUS
        )
      );
    }
    return positions;
  }, [allSkills]);

  useFrame(() => {
    if (groupRef.current && !isAnyHovered) {
      groupRef.current.rotation.y += TECH_SPHERE_CONFIG.ROTATION_SPEED;
    }
  });

  const handleSkillClick = useCallback((skill: string) => {
    console.log("TechSphere: Clicked on skill:", skill);

    const skillKey = Object.keys(SKILL_DETAILS).find(
      (key) =>
        skill.toLowerCase().includes(key.toLowerCase()) ||
        key.toLowerCase().includes(skill.toLowerCase())
    );

    const detail = skillKey
      ? SKILL_DETAILS[skillKey]
      : {
          name: skill,
          description: `Experience with ${skill}.`,
          level: 75,
          years: 2,
          projects: 3,
          category: "other" as const,
        };

    console.log("TechSphere: Dispatching event with detail:", detail);

    const detailData = skillKey
      ? SKILL_DETAILS[skillKey]
      : {
          name: skill,
          description: `Experience with ${skill}.`,
          level: 75,
          years: 2,
          projects: 3,
          category: "other" as const,
        };

    const event = new CustomEvent("skill-click", {
      detail: detailData as any,
      bubbles: true,
      cancelable: true,
    });

    window.dispatchEvent(event);
    document.dispatchEvent(event);
  }, []);

  useEffect(() => {
    setIsAnyHovered(hoveredSkill !== null);
  }, [hoveredSkill]);

  return (
    <group ref={groupRef}>
      {/* Central sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {allSkills.map((skill, i) => {
        const position = spherePositions[i];
        if (!position) return null;

        const isHovered = hoveredSkill === skill;
        const skillColor = getSkillColor(skill);

        return (
          <group key={`${skill}-${i}`}>
            <mesh
              position={[position.x, position.y, position.z]}
              onClick={(e) => {
                e.stopPropagation();
                handleSkillClick(skill);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                setHoveredSkill(skill);
              }}
              onPointerOut={(e) => {
                e.stopPropagation();
                setHoveredSkill(null);
              }}
              scale={isHovered ? [1.3, 1.3, 1.3] : [1, 1, 1]}
            >
              <sphereGeometry
                args={[TECH_SPHERE_CONFIG.SPHERE_RADIUS, 48, 48]}
              />
              <meshStandardMaterial
                color={skillColor}
                emissive={skillColor}
                emissiveIntensity={isHovered ? 0.8 : 0.4}
                roughness={0.3}
                metalness={0.7}
              />
            </mesh>

            {isHovered && (
              <Html
                position={[position.x, position.y + 0.6, position.z]}
                distanceFactor={1}
                style={{
                  pointerEvents: "none",
                  width: "auto",
                  height: "auto",
                  transform: "translate3d(-50%, -50%, 0)",
                  fontSize: "12px",
                  lineHeight: "1",
                }}
                center
              >
                <div
                  className="rounded-lg border border-white/20 bg-black/90 px-3 py-2 whitespace-nowrap shadow-xl backdrop-blur-sm"
                  style={{
                    transform: "scale(1)",
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="text-xs font-bold text-white">{skill}</div>
                  <div className="mt-1 text-[10px] text-blue-400">
                    Click for details
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}

export function TechSphere({ className = "" }: { className?: string }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div
        className={`relative flex aspect-square w-full items-center justify-center rounded-2xl border border-dashed border-gray-700 bg-gray-900/20 ${className}`}
      >
        <p className="text-sm text-gray-500">3D View optimized for desktop</p>
      </div>
    );
  }

  return (
    <div className={`relative aspect-square w-full max-w-[500px] ${className}`}>
      <Canvas
        camera={{
          position: TECH_SPHERE_CONFIG.CAMERA_POSITION,
          fov: TECH_SPHERE_CONFIG.CAMERA_FOV,
        }}
        onCreated={() => setIsLoading(false)}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#0a0a0a"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
        <TechSphere3D />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableDamping
          dampingFactor={0.05}
          zoomSpeed={0.5}
          minDistance={3}
          maxDistance={10}
        />
      </Canvas>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        </div>
      )}
    </div>
  );
}
