import ScrollOrchestrator from "@/components/motion/ScrollOrchestrator";
import Approach from "@/components/stages/Approach";
import Engage from "@/components/stages/Engage";
import Inhabit from "@/components/stages/Inhabit";
import Verify from "@/components/stages/Verify";

export default function HomePage() {
  return (
    <main>
      <ScrollOrchestrator />
      <Approach />
      <Inhabit />
      <Verify />
      <Engage />
    </main>
  );
}
