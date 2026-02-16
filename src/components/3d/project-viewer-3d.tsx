"use client";

import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Button,
} from "@/components/ui";
import { X, Code, ExternalLink } from "@/lib/icons";

interface ProjectModel {
  id: string;
  title: string;
  tech: string[];
  position: [number, number, number];
  scale: number;
  description: string;
  link?: string;
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

  useFrame((_state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={project.position}
      scale={hovered ? project.scale * 1.1 : project.scale}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={hovered ? "#3b82f6" : "#1e40af"}
        emissive="#3b82f6"
        emissiveIntensity={hovered ? 0.2 : 0.1}
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  );
}

function Scene({
  onProjectClick,
}: {
  onProjectClick: (project: ProjectModel) => void;
}) {
  const projects: ProjectModel[] = [
    {
      id: "1",
      title: "Portfolio",
      tech: ["React", "Next.js", "Three.js"],
      position: [-2.5, 1, 0],
      scale: 0.6,
      description:
        "Interactive 3D portfolio built with modern web technologies",
      link: "https://github.com/sinahatami",
    },
    {
      id: "2",
      title: "AI Projects",
      tech: ["Python", "TensorFlow", "ML"],
      position: [0, 0, -2.5],
      scale: 0.6,
      description: "Machine learning and computer vision projects",
      link: "https://github.com/sinahatami",
    },
    {
      id: "3",
      title: "Web Apps",
      tech: ["TypeScript", "Node.js", "AWS"],
      position: [2.5, -1, 0],
      scale: 0.6,
      description: "Full-stack web applications and microservices",
      link: "https://github.com/sinahatami",
    },
  ];

  return (
    <>
      {/* Simple lighting */}
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#3b82f6" />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} />

      {/* Central sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#3b82f6"
          emissive="#3b82f6"
          emissiveIntensity={0.2}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Projects */}
      {projects.map((project) => (
        <ProjectCube
          key={project.id}
          project={project}
          onClick={() => onProjectClick(project)}
        />
      ))}

      {/* Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minDistance={4}
        maxDistance={15}
        enableDamping
        dampingFactor={0.05}
      />
    </>
  );
}

export function ProjectViewer3D() {
  const [selectedProject, setSelectedProject] = useState<ProjectModel | null>(
    null
  );

  const handleProjectClick = (project: ProjectModel) => {
    setSelectedProject(project);
  };

  return (
    <div className="relative h-[500px] w-full overflow-hidden rounded-2xl border border-white/10">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 60 }}
        style={{
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)",
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }}
      >
        <Scene onProjectClick={handleProjectClick} />
      </Canvas>

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
              <div className="mb-4 flex flex-wrap gap-2">
                {selectedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-accent/20 text-accent rounded-full px-3 py-1 text-xs font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              {selectedProject.link && (
                <Button size="sm" variant="outline" className="w-full" asChild>
                  <a href={selectedProject.link} target="_blank">
                    <Code className="mr-2 h-4 w-4" />
                    View Project
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-xl border border-white/20 bg-black/50 p-3 backdrop-blur-sm">
        <p className="text-xs text-white">
          Drag to rotate • Scroll to zoom • Click cubes for details
        </p>
      </div>
    </div>
  );
}
