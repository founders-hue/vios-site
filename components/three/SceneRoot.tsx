"use client";

import { useActiveStage } from "@/components/motion/ActiveStageContext";
import ApproachContent from "@/components/three/scenes/ApproachContent";
import InhabitContent from "@/components/three/scenes/InhabitContent";

export default function SceneRoot() {
  const { active } = useActiveStage();
  const inhabitActive = active === "inhabit";
  const approachActive = active === "approach" || active === null;

  return (
    <>
      <group visible={approachActive}>
        <ApproachContent />
      </group>
      <group visible={inhabitActive}>
        <InhabitContent active={inhabitActive} />
      </group>
    </>
  );
}
