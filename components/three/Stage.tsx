"use client";

import { Canvas } from "@react-three/fiber";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  frameloop?: "always" | "demand" | "never";
};

export default function Stage({ children, frameloop = "demand" }: Props) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={frameloop}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
    >
      {children}
    </Canvas>
  );
}
