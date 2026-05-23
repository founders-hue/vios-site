"use client";

import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { PerspectiveCamera as ThreePerspectiveCamera } from "three";
import { inhabitCameraObject } from "@/lib/theatre/objects";

type Props = {
  makeDefault?: boolean;
};

export default function InhabitCamera({ makeDefault = false }: Props) {
  const ref = useRef<ThreePerspectiveCamera>(null);

  useFrame(() => {
    const cam = ref.current;
    if (!cam) return;
    const v = inhabitCameraObject.value;
    cam.position.set(v.position.x, v.position.y, v.position.z);
    cam.rotation.set(v.rotation.x, v.rotation.y, v.rotation.z);
    if (cam.fov !== v.fov) {
      cam.fov = v.fov;
      cam.updateProjectionMatrix();
    }
  });

  return <PerspectiveCamera ref={ref} makeDefault={makeDefault} />;
}
