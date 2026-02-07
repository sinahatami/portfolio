"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Float,
  Environment,
  Text,
} from "@react-three/drei";
import * as THREE from "three";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Globe, Smartphone, Eye } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

interface ProjectModel {
  id: string;
  title: string;
  tech: string[];
  position: [number, number, number];
  scale: number;
  description: string;
}

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
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={project.position}
        scale={hovered ? project.scale * 1.2 : project.scale}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={hovered ? "#3b82f6" : "#1e40af"}
          emissive="#3b82f6"
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.8}
        />

        <Html
          position={[0, 1.2, 0]}
          center
          transform={false}
          distanceFactor={10}
        >
          <div className="rounded-lg border border-white/20 bg-black/90 px-3 py-2 backdrop-blur-sm">
            <div className="text-sm font-bold text-white">{project.title}</div>
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

function TechSphereAR() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.6}
          metalness={1}
          roughness={0.1}
        />
      </mesh>

      {/* Text without external font */}
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        TECH
      </Text>
    </group>
  );
}

// Simple version without XR for now
export function ARViewer() {
  const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(
    null
  );
  const [isSupported, setIsSupported] = useState(false);

  const projects: ProjectModel[] = [
    {
      id: "1",
      title: "Portfolio",
      tech: ["React", "Next.js", "Three.js"],
      position: [-3, 0, 0],
      scale: 0.8,
      description: "Interactive 3D portfolio with WebXR support",
    },
    {
      id: "2",
      title: "AI Projects",
      tech: ["Python", "TensorFlow", "ML"],
      position: [0, 0, -3],
      scale: 0.8,
      description: "Machine learning and computer vision projects",
    },
    {
      id: "3",
      title: "Web Apps",
      tech: ["TypeScript", "Node.js", "AWS"],
      position: [3, 0, 0],
      scale: 0.8,
      description: "Full-stack web applications and microservices",
    },
  ];

  useEffect(() => {
    // Check WebXR support
    if (typeof navigator !== "undefined" && navigator.xr) {
      navigator.xr
        .isSessionSupported("immersive-ar")
        .then((supported) => {
          setIsSupported(supported);
        })
        .catch(() => {
          setIsSupported(false);
        });
    } else {
      setIsSupported(false);
    }
  }, []);

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-2xl border border-white/10">
      <Canvas
        camera={{ position: [0, 2, 5], fov: 75 }}
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1e1e2e 100%)",
        }}
        onCreated={({ gl }) => {
          // Handle WebGL context properly
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          gl.domElement.addEventListener("webglcontextlost", (event) => {
            event.preventDefault();
            console.warn("WebGL context lost");
          });
        }}
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <spotLight
            position={[-10, 10, -10]}
            angle={0.3}
            penumbra={1}
            intensity={1}
          />

          {/* Environment */}
          <Environment preset="city" />

          {/* Projects */}
          {projects.map((project) => (
            <ProjectCube
              key={project.id}
              project={project}
              onClick={() => setSelectedProject(project)}
            />
          ))}

          {/* Tech Sphere */}
          <TechSphereAR />

          {/* Controls - desktop only for now */}
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minDistance={2}
            maxDistance={10}
            enableDamping
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 left-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4 rounded-xl border border-white/20 bg-black/50 p-3 backdrop-blur-sm">
          <Button variant="default" size="sm" className="gap-2">
            <Globe className="h-4 w-4" />
            Desktop View
          </Button>

          {isSupported && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                // TODO: Implement AR mode when XR is fixed
                alert("AR mode will be available in the next update!");
              }}
              className="gap-2"
            >
              <Smartphone className="h-4 w-4" />
              AR View (Coming Soon)
            </Button>
          )}
        </div>
      </div>

      {/* Project Details Panel */}
      {selectedProject && (
        <div className="absolute right-4 bottom-4 left-4">
          <Card className="border-white/20 bg-black/90 backdrop-blur-md">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  {selectedProject.title}
                </CardTitle>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setSelectedProject(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 text-sm">
                {selectedProject.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-accent/20 text-accent rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 rounded-xl border border-white/20 bg-black/50 p-4 backdrop-blur-sm">
        <p className="text-sm text-white">
          👆 Click and drag to rotate • Scroll to zoom • Click cubes for details
        </p>
      </div>
    </div>
  );
}
