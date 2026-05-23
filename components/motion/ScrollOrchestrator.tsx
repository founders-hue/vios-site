"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { useActiveStage } from "@/components/motion/ActiveStageContext";
import { inhabitSheet } from "@/lib/theatre/project";
import { STAGE_TIMING, type StageId } from "@/lib/timing";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollOrchestrator() {
  const { setActive } = useActiveStage();

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const showMarkers = process.env.NODE_ENV !== "production";

    const ctx = gsap.context(() => {
      (Object.keys(STAGE_TIMING) as StageId[]).forEach((id) => {
        const { pinned, pinVh } = STAGE_TIMING[id];

        const trigger = document.querySelector(`[data-stage="${id}"]`);
        if (!trigger) return;

        ScrollTrigger.create({
          trigger,
          start: "top top",
          end: pinned ? `+=${pinVh}%` : "bottom top",
          pin: pinned,
          pinSpacing: pinned,
          anticipatePin: pinned ? 1 : 0,
          markers: showMarkers,
          onEnter: () => setActive(id),
          onEnterBack: () => setActive(id),
          onUpdate:
            id === "inhabit"
              ? (self) => {
                  inhabitSheet.sequence.position = self.progress;
                }
              : undefined,
        });
      });
    });

    return () => ctx.revert();
  }, [setActive]);

  return null;
}
