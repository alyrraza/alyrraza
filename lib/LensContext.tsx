"use client";

import {
  createContext,
  useContext,
  useCallback,
  useSyncExternalStore,
  ReactNode,
} from "react";
import { Lens } from "@/types";

const STORAGE_KEY = "portfolio-lens";
const LENS_EVENT = "portfolio-lens-change";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(LENS_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(LENS_EVENT, callback);
  };
}

function getSnapshot(): Lens {
  return window.localStorage.getItem(STORAGE_KEY) === "research"
    ? "research"
    : "engineering";
}

function getServerSnapshot(): Lens {
  return "engineering";
}

interface LensContextValue {
  lens: Lens;
  setLens: (lens: Lens) => void;
  toggleLens: () => void;
}

const LensContext = createContext<LensContextValue | null>(null);

export function LensProvider({ children }: { children: ReactNode }) {
  const lens = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLens = useCallback((next: Lens) => {
    window.localStorage.setItem(STORAGE_KEY, next);
    window.dispatchEvent(new Event(LENS_EVENT));
  }, []);

  const toggleLens = useCallback(() => {
    setLens(lens === "engineering" ? "research" : "engineering");
  }, [lens, setLens]);

  return (
    <LensContext.Provider value={{ lens, setLens, toggleLens }}>
      {children}
    </LensContext.Provider>
  );
}

export function useLens() {
  const ctx = useContext(LensContext);
  if (!ctx) throw new Error("useLens must be used within a LensProvider");
  return ctx;
}
