"use client";

import { Canvas } from "@react-three/fiber";
import SceneRoot from "@/components/three/SceneRoot";
import { useWebGL } from "@/components/three/WebGLContext";

export default function StageRenderer() {
  const verdict = useWebGL();

  if (!verdict?.ok) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        dpr={[1, 2]}
        frameloop="always"
        gl={{ antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 5.5], fov: 45 }}
      >
        <SceneRoot />
      </Canvas>
    </div>
  );
}
