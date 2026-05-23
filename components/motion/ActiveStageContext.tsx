"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { StageId } from "@/lib/timing";

type ActiveStage = StageId | null;

type ContextValue = {
  active: ActiveStage;
  setActive: (stage: ActiveStage) => void;
};

const ActiveStageCtx = createContext<ContextValue>({
  active: null,
  setActive: () => {},
});

export function ActiveStageProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<ActiveStage>(null);
  return (
    <ActiveStageCtx.Provider value={{ active, setActive }}>{children}</ActiveStageCtx.Provider>
  );
}

export function useActiveStage() {
  return useContext(ActiveStageCtx);
}
