"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text, MeshTransmissionMaterial } from "@react-three/drei";
import { animated, useSpring } from "@react-spring/three";
import * as THREE from "three";
import type { CardDefinition, CardState } from "@/types";
import { useCardStore } from "@/stores/useCardStore";

const AnimatedGroup = animated.group;

interface HoloCardProps {
  def: CardDefinition;
  angle: number;
  radius: number;
  state: CardState;
}

const SCALE_BY_STATE: Record<CardState, number> = {
  idle: 1,
  hovered: 1.08,
  selected: 1.15,
  expanded: 1.9,
  focused: 1.3,
  dragging: 1.12,
};

export function HoloCard({ def, angle, radius, state }: HoloCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const select = useCardStore((s) => s.select);
  const expand = useCardStore((s) => s.expand);
  const rotation = useCardStore((s) => s.rotation);

  const effectiveState: CardState = hovered && state === "idle" ? "hovered" : state;

  const spring = useSpring({
    scale: SCALE_BY_STATE[effectiveState],
    emissive: effectiveState === "idle" ? 0.15 : effectiveState === "expanded" ? 0.9 : 0.5,
    config: { mass: 1, tension: 210, friction: 22 },
  });

  useFrame((frameState) => {
    if (!groupRef.current) return;
    const t = frameState.clock.getElapsedTime();
    const worldAngle = angle + rotation;
    const x = Math.sin(worldAngle) * radius;
    const z = Math.cos(worldAngle) * radius;
    const bob = Math.sin(t * 0.6 + angle * 3) * 0.08;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, x, 0.08);
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, z, 0.08);
    groupRef.current.position.y = bob;
    groupRef.current.lookAt(0, groupRef.current.position.y, 0);
  });

  return (
    <AnimatedGroup
      ref={groupRef}
      scale={spring.scale}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation();
        if (state === "expanded") {
          expand(null);
        } else {
          select(def.id);
          expand(def.id);
        }
      }}
    >
      <RoundedBox args={[1.6, 2.1, 0.06]} radius={0.09} smoothness={6}>
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.35}
          roughness={0.08}
          chromaticAberration={0.02}
          anisotropy={0.15}
          distortion={0.1}
          distortionScale={0.2}
          temporalDistortion={0.05}
          color="#0d1a2b"
          ior={1.2}
          background={new THREE.Color("#03050a")}
        />
      </RoundedBox>

      <animated.mesh position={[0, 0, 0.035]}>
        <planeGeometry args={[1.5, 2.0]} />
        <animated.meshBasicMaterial
          color={def.accent}
          transparent
          opacity={spring.emissive.to((v) => v * 0.06)}
        />
      </animated.mesh>

      <Text
        position={[0, 0.35, 0.04]}
        fontSize={0.42}
        color={def.accent}
        anchorX="center"
        anchorY="middle"
      >
        {def.glyph}
      </Text>
      <Text
        position={[0, -0.55, 0.04]}
        fontSize={0.11}
        letterSpacing={0.12}
        color="#dceeff"
        anchorX="center"
        anchorY="middle"
      >
        {def.label}
      </Text>
      <Text
        position={[0, -0.78, 0.04]}
        fontSize={0.06}
        color="#6fa8cc"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.3}
      >
        {def.description}
      </Text>

      <lineSegments position={[0, 0, 0.036]}>
        <edgesGeometry args={[new THREE.BoxGeometry(1.6, 2.1, 0.001)]} />
        <lineBasicMaterial color={def.accent} transparent opacity={0.5} />
      </lineSegments>
    </AnimatedGroup>
  );
}
