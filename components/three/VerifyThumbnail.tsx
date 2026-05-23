"use client";

import { PerspectiveCamera, View } from "@react-three/drei";
import VerifyContent from "@/components/three/scenes/VerifyContent";

export default function VerifyThumbnail() {
  return (
    <View className="aspect-square w-full rounded-sm border border-ink-100/10 bg-ink-900/40">
      <PerspectiveCamera makeDefault position={[0, 0, 3]} fov={45} />
      <VerifyContent />
    </View>
  );
}
