"use client";

import { useEffect, useRef } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { CARD_DEFINITIONS } from "@/lib/cardData";
import { angleOnRing, TAU } from "@/lib/math";
import { useCardStore } from "@/stores/useCardStore";
import { useGestureStore } from "@/stores/useGestureStore";
import { HoloCard } from "./HoloCard";
import { playGestureChime } from "@/audio/AudioEngine";

const RADIUS = 4.2;

function frontmostIndex(rotation: number) {
  let best = 0;
  let bestScore = -Infinity;
  CARD_DEFINITIONS.forEach((_, i) => {
    const worldAngle = angleOnRing(i, CARD_DEFINITIONS.length) + rotation;
    const score = Math.cos(worldAngle);
    if (score > bestScore) {
      bestScore = score;
      best = i;
    }
  });
  return best;
}

export function CardOrbit() {
  const dragging = useRef(false);
  const lastX = useRef(0);
  const groupRef = useRef<THREE.Group>(null);
  const prevGesture = useRef<string>("none");

  const rotation = useCardStore((s) => s.rotation);
  const setRotation = useCardStore((s) => s.setRotation);
  const rotateBy = useCardStore((s) => s.rotateBy);
  const targetRotation = useCardStore((s) => s.targetRotation);
  const cardStates = useCardStore((s) => s.cardStates);
  const select = useCardStore((s) => s.select);
  const expand = useCardStore((s) => s.expand);
  const expandedId = useCardStore((s) => s.expandedId);

  useFrame((_, dt) => {
    const frozen = useGestureStore.getState().frozen;
    if (!frozen) {
      const next = THREE.MathUtils.damp(rotation, targetRotation, 4, dt);
      setRotation(next);
    }
  });

  useEffect(() => {
    const unsub = useGestureStore.subscribe((state) => {
      const gesture = state.currentGesture;
      if (gesture === prevGesture.current) return;
      prevGesture.current = gesture;

      const step = TAU / CARD_DEFINITIONS.length;
      const { rotation: currentRotation, expandedId: currentExpanded } =
        useCardStore.getState();

      switch (gesture) {
        case "swipe_left":
          rotateBy(step);
          break;
        case "swipe_right":
          rotateBy(-step);
          break;
        case "pinch": {
          const idx = frontmostIndex(currentRotation);
          const def = CARD_DEFINITIONS[idx];
          select(def.id);
          playGestureChime("select");
          break;
        }
        case "pull": {
          const idx = frontmostIndex(currentRotation);
          const def = CARD_DEFINITIONS[idx];
          expand(def.id);
          playGestureChime("confirm");
          break;
        }
        case "push": {
          if (currentExpanded) {
            expand(null);
            playGestureChime("release");
          }
          break;
        }
        default:
          break;
      }
    });
    return unsub;
  }, [rotateBy, select, expand]);

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = true;
    lastX.current = e.clientX;
  };
  const onPointerUp = () => {
    dragging.current = false;
  };
  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    useCardStore.getState().rotateBy(dx * 0.008);
    useCardStore.getState().setRotation(useCardStore.getState().rotation + dx * 0.008);
  };

  return (
    <group ref={groupRef}>
      <mesh
        visible={false}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        onPointerOut={onPointerUp}
      >
        <sphereGeometry args={[14, 8, 8]} />
        <meshBasicMaterial side={THREE.BackSide} />
      </mesh>

      {CARD_DEFINITIONS.map((def, i) => (
        <HoloCard
          key={def.id}
          def={def}
          angle={angleOnRing(i, CARD_DEFINITIONS.length)}
          radius={expandedId === def.id ? RADIUS * 0.55 : RADIUS}
          state={cardStates[def.id]}
        />
      ))}
    </group>
  );
}
