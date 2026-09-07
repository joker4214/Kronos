"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ParticleField } from "./ParticleField";

function LightBeam({
  position,
  rotation,
  color,
  speed,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  speed: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    const mat = ref.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.05 + Math.sin(t * speed) * 0.03 + 0.03;
  });
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeGeometry args={[0.6, 20]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.06}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function Environment() {
  return (
    <>
      <fog attach="fog" args={["#03050a", 6, 26]} />
      <color attach="background" args={["#03050a"]} />
      <ambientLight intensity={0.25} color="#4a7fbf" />
      <pointLight position={[0, 4, 0]} intensity={12} color="#6fc3ff" distance={20} decay={2} />
      <pointLight position={[6, -2, -4]} intensity={6} color="#ffffff" distance={16} decay={2} />
      <pointLight position={[-6, 2, 4]} intensity={5} color="#9d5eff" distance={16} decay={2} />

      <ParticleField />

      <LightBeam position={[5, 0, -3]} rotation={[0, 0.4, 0.15]} color="#6fc3ff" speed={0.3} />
      <LightBeam position={[-6, 0, 2]} rotation={[0, -0.3, -0.1]} color="#ffffff" speed={0.22} />
      <LightBeam position={[2, 0, 6]} rotation={[0, 1.1, 0.05]} color="#6fc3ff" speed={0.4} />
    </>
  );
}
