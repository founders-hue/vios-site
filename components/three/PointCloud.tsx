"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Points as ThreePoints } from "three";

const POINT_COUNT = 30_000;
const RADIUS = 2.4;
const ROTATION_SPEED = 0.04;
const BRASS = "#bda37a";

function fibonacciSphere(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
  }
  return positions;
}

export default function PointCloud() {
  const ref = useRef<ThreePoints>(null);
  const positions = useMemo(() => fibonacciSphere(POINT_COUNT, RADIUS), []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * ROTATION_SPEED;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={BRASS}
        size={0.012}
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}
