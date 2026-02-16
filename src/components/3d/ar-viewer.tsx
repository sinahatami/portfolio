"use client";

import { useState, useEffect, useRef, Suspense, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Float,
  Environment,
  Text,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@/components/ui";
import { X, Globe, Smartphone, Info } from "@/lib/icons";
import { LoadingSpinner } from "../ui/loading-spinner";
import { OptimizedCanvas } from "../ui/optimized-canvas";
import { useWebGLSupport } from "@/hooks/use-webgl-support";

// --- Types ---
interface ProjectModel {
  id: string;
  title: string;
  tech: string[];
  position: [number, number, number];
  scale: number;
  description: string;
}

// --- Components ---

function ProjectCube({
  project,
  onClick,
}: {
  project: ProjectModel;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(t * 0.5) * 0.2;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        position={project.position}
        scale={hovered ? project.scale * 1.15 : project.scale}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={hovered ? "#3b82f6" : "#1e40af"}
          emissive="#3b82f6"
          emissiveIntensity={hovered ? 0.5 : 0.2}
          roughness={0.2}
          metalness={0.8}
        />

        <Html
          position={[0, 0.8, 0]}
          center
          distanceFactor={8}
          className="pointer-events-none select-none"
        >
          <div
            className={`transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
          >
            <div className="rounded-md border border-white/20 bg-black/80 px-2 py-1 backdrop-blur-sm">
              <p className="text-[10px] font-bold whitespace-nowrap text-white">
                {project.title}
              </p>
            </div>
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

function TechSphereAR() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.6}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
      <Text
        position={[0, 2.4, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff" // Ensure you have this font or remove this line
      >
        PROJECTS
      </Text>
    </group>
  );
}

export function ARViewer() {
  const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(
    null
  );
  const [isARSupported, setIsARSupported] = useState(false);
  const { supported: webglSupported } = useWebGLSupport();

  const projects = useMemo<ProjectModel[]>(
    () => [
      {
        id: "1",
        title: "Portfolio",
        tech: ["React", "Next.js", "Three.js"],
        position: [-2.5, 0, 0],
        scale: 0.7,
        description:
          "Interactive 3D portfolio with custom shaders and WebXR support.",
      },
      {
        id: "2",
        title: "AI Analysis",
        tech: ["Python", "TensorFlow", "FastAPI"],
        position: [0, 0, -2.5],
        scale: 0.7,
        description:
          "Real-time computer vision system for industrial safety monitoring.",
      },
      {
        id: "3",
        title: "Cloud Infrastructure",
        tech: ["Terraform", "AWS", "Go"],
        position: [2.5, 0, 0],
        scale: 0.7,
        description:
          "Auto-scaling microservices architecture with 99.9% uptime.",
      },
    ],
    []
  );

  useEffect(() => {
    if (typeof navigator !== "undefined" && (navigator as any).xr) {
      (navigator as any).xr
        .isSessionSupported("immersive-ar")
        .then((supported: boolean) => setIsARSupported(supported))
        .catch(() => setIsARSupported(false));
    }
  }, []);

  if (webglSupported === null) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center rounded-2xl bg-black/10">
        <LoadingSpinner variant="tech-orbit" size={40} />
      </div>
    );
  }

  if (webglSupported === false) {
    return (
      <div className="flex h-[600px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/40 p-8 text-center">
        <Info className="mb-4 h-12 w-12 text-blue-500" />
        <h3 className="text-xl font-bold text-white">
          3D Experience Unavailable
        </h3>
        <p className="mt-2 max-w-xs text-sm text-gray-400">
          Your browser doesn't support WebGL. Please try using a modern browser
          like Chrome or Firefox to see the 3D showcase.
        </p>
      </div>
    );
  }

  return (
    <div className="group relative h-[600px] w-full overflow-hidden rounded-2xl border border-white/10 transition-all hover:border-blue-500/30">
      <OptimizedCanvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 6]} fov={50} />

        <Suspense fallback={null}>
          <color attach="background" args={["#050505"]} />
          <fog attach="fog" args={["#050505", 5, 15]} />

          <ambientLight intensity={0.4} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={1}
            castShadow
          />
          <pointLight
            position={[-10, -10, -10]}
            intensity={0.5}
            color="#1e40af"
          />

          <Environment preset="city" />

          <group position={[0, -0.5, 0]}>
            {projects.map((project) => (
              <ProjectCube
                key={project.id}
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            ))}
            <TechSphereAR />
          </group>

          <OrbitControls
            enableZoom={true}
            enablePan={false}
            maxPolarAngle={Math.PI / 1.8}
            minDistance={3}
            maxDistance={9}
            makeDefault
          />
        </Suspense>
      </OptimizedCanvas>

      {/* --- Overlays --- */}

      {/* Top Controls */}
      <div className="absolute top-4 right-4 left-4 flex items-center justify-between">
        <div className="flex gap-2 rounded-full border border-white/10 bg-black/60 p-1 backdrop-blur-md">
          <Button
            variant="secondary"
            size="sm"
            className="h-8 rounded-full px-4 text-xs"
          >
            <Globe className="mr-2 h-3 w-3" />
            Interactive 3D
          </Button>
          {isARSupported && (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 rounded-full px-4 text-xs text-gray-400 hover:text-white"
              onClick={() => alert("AR Mode activating...")}
            >
              <Smartphone className="mr-2 h-3 w-3" />
              AR View
            </Button>
          )}
        </div>
      </div>

      {/* Selected Project Card */}
      {selectedProject && (
        <div className="animate-in fade-in slide-in-from-bottom-4 absolute inset-x-4 bottom-4 z-10 duration-300">
          <Card className="border-white/20 bg-black/90 shadow-2xl backdrop-blur-xl">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-bold text-white">
                {selectedProject.title}
              </CardTitle>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-gray-400 hover:text-white"
                onClick={() => setSelectedProject(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-400">
                {selectedProject.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedProject.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-[10px] font-medium text-blue-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Bottom Instructions */}
      {!selectedProject && (
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 opacity-40 transition-opacity group-hover:opacity-100">
          <p className="rounded-full bg-black/20 px-4 py-1 text-[10px] tracking-widest text-white/60 uppercase backdrop-blur-sm">
            Drag to Rotate • Scroll to Zoom • Click Objects
          </p>
        </div>
      )}
    </div>
  );
}
