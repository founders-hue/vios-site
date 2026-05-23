"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { probeWebGL, type WebGLVerdict } from "@/lib/webgl-probe";

const WebGLCtx = createContext<WebGLVerdict | null>(null);

export function WebGLProvider({ children }: { children: ReactNode }) {
  const [verdict, setVerdict] = useState<WebGLVerdict | null>(null);

  useEffect(() => {
    setVerdict(probeWebGL());
  }, []);

  return <WebGLCtx.Provider value={verdict}>{children}</WebGLCtx.Provider>;
}

export function useWebGL(): WebGLVerdict | null {
  return useContext(WebGLCtx);
}
