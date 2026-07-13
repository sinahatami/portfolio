import { useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { ProjectModel } from "./project-model";

export function ProjectCube({
  project,
  onClick,
}: {
  project: ProjectModel;
  onClick: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
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
