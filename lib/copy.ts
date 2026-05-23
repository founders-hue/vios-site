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
    body: [
      "Listings flatter the building. Agents narrate around the flaws. Video tours edit out the dark corners. Most buyers fly across the world on a story.",
      "A VIOS scan records the property as it stands. Every wall, every ceiling height, every flaw. Nothing is composed.",
      "The buyer returns to the scan whenever they want. They measure the doorway. They check the eastern exposure at sunrise. They show their partner.",
      "Confidence then shows up at the offer, not at the inspection.",
    ],
  },
  engage: {
    label: "Engage",
    headline: "Bring us a property.",
    body: "We will tell you what it takes to capture it, and what changes when it lives online.",
    cta: "Request a capture",
  },
} as const;

export type StageCopy = typeof copy;
