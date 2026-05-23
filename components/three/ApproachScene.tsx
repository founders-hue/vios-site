"use client";

import PointCloud from "@/components/three/PointCloud";
import Stage from "@/components/three/Stage";

export default function ApproachScene() {
  return (
    <Stage frameloop="always">
      <ambientLight intensity={0.5} />
      <PointCloud />
    </Stage>
  );
}
