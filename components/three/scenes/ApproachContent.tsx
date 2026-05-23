"use client";

import PointCloud from "@/components/three/PointCloud";

export default function ApproachContent() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <PointCloud />
    </>
  );
}
