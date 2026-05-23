export const copy = {
  approach: {
    label: "Approach",
  },
  inhabit: {
    label: "Inhabit",
    headline: "Walk the room before you book the flight.",
    body: "Move through the property from any continent. Every dimension is true to the building.",
  },
  verify: {
    label: "Verify",
    headline: "Measured to the millimetre, every surface.",
    body: "Return to any detail. Compare what the listing tells you with what the scan recorded.",
  },
  engage: {
    label: "Engage",
    headline: "Bring us a property.",
    body: "We will tell you what it takes to capture it, and what changes when it lives online.",
    cta: "Request a capture",
  },
} as const;

export type StageCopy = typeof copy;
