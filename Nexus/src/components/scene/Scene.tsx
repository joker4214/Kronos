"use client";

import { Canvas } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { Environment } from "./Environment";
import { CameraRig } from "./CameraRig";
import { CardOrbit } from "@/components/cards/CardOrbit";
import { useFPSMeter } from "@/hooks/useFPS";

function FPSProbe() {
  useFPSMeter();
  return null;
}

export function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9], fov: 45 }}
    >
      <FPSProbe />
      <Environment />
      <CameraRig />
      <CardOrbit />
      <EffectComposer multisampling={0}>
        <Bloom
          intensity={0.65}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.4}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.9} />
      </EffectComposer>
    </Canvas>
  );
}
