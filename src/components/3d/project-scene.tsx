import { OrbitControls } from "@react-three/drei";
import { ProjectCube } from "./project-cube";
import type { ProjectModel } from "./project-model";

export function ProjectScene({
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
