"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { STAGE_TIMING, type StageId } from "@/lib/timing";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollOrchestrator() {
  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const showMarkers = process.env.NODE_ENV !== "production";

    const ctx = gsap.context(() => {
      (Object.keys(STAGE_TIMING) as StageId[]).forEach((id) => {
        const { pinned, pinVh } = STAGE_TIMING[id];
        if (!pinned) return;

        const trigger = document.querySelector(`[data-stage="${id}"]`);
        if (!trigger) return;

        ScrollTrigger.create({
          trigger,
          start: "top top",
          end: `+=${pinVh}%`,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          markers: showMarkers,
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return null;
}
