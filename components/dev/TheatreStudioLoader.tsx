"use client";

import { useEffect } from "react";

export default function TheatreStudioLoader() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;

    let cancelled = false;
    Promise.all([import("@theatre/studio"), import("@/lib/theatre/objects")]).then(
      ([studio]) => {
        if (cancelled) return;
        studio.default.initialize();
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
