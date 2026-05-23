export type StageId = "approach" | "inhabit" | "verify" | "engage";

type StageTiming = {
  /** Whether the stage gets pinned by ScrollOrchestrator. */
  pinned: boolean;
  /** Extra viewport-heights of scroll to consume while the stage is pinned. */
  pinVh: number;
};

export const STAGE_TIMING: Record<StageId, StageTiming> = {
  approach: { pinned: false, pinVh: 0 },
  inhabit: { pinned: true, pinVh: 100 },
  verify: { pinned: true, pinVh: 50 },
  engage: { pinned: false, pinVh: 0 },
};

export const STAGE_ORDER: readonly StageId[] = ["approach", "inhabit", "verify", "engage"];
