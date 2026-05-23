"use client";

import InhabitCamera from "@/components/three/InhabitCamera";

type Props = {
  active?: boolean;
};

export default function InhabitContent({ active = false }: Props) {
  return (
    <group position={[0, 0, -30]}>
      <InhabitCamera makeDefault={active} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 10, 5]} intensity={0.7} />

      <mesh position={[-3, 0, 0]}>
        <boxGeometry args={[1.5, 3, 1.5]} />
        <meshStandardMaterial color="#2a2a2e" />
      </mesh>
      <mesh position={[3, 0, 0]}>
        <boxGeometry args={[1.5, 3, 1.5]} />
        <meshStandardMaterial color="#2a2a2e" />
      </mesh>
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[12, 30]} />
        <meshStandardMaterial color="#16161a" />
      </mesh>
    </group>
  );
}
