"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export function CameraRig() {
  const { camera } = useThree();
  const base = useRef(new THREE.Vector3(0, 0, 9));
  const mouse = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    mouse.current.x = state.pointer.x;
    mouse.current.y = state.pointer.y;

    const driftX = Math.sin(t * 0.08) * 0.4 + mouse.current.x * 0.3;
    const driftY = Math.cos(t * 0.06) * 0.2 + mouse.current.y * 0.15;
    const driftZ = base.current.z + Math.sin(t * 0.05) * 0.3;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, driftX, 0.02);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, driftY, 0.02);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, driftZ, 0.02);
    camera.lookAt(0, 0, 0);
  });

  return null;
}
