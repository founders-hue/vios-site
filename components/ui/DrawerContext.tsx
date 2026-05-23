"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type ContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  setOpen: (next: boolean) => void;
};

const DrawerCtx = createContext<ContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
  setOpen: () => {},
});

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  return (
    <DrawerCtx.Provider value={{ isOpen, open, close, setOpen }}>{children}</DrawerCtx.Provider>
  );
}

export function useDrawer() {
  return useContext(DrawerCtx);
}
