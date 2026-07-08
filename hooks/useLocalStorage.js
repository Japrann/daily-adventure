"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { readStorage, writeStorage } from "@/lib/storage";

/**
 * useState-like hook backed by localStorage.
 * `initialValue` is used for the very first render (SSR-safe); the real
 * persisted value (if any) is loaded in an effect right after mount, and
 * `isHydrated` flips to true once that has happened.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(initialValue);
  const [isHydrated, setIsHydrated] = useState(false);
  const initialValueRef = useRef(initialValue);

  useEffect(() => {
    const stored = readStorage(key, initialValueRef.current);
    setValue(stored);
    setIsHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!isHydrated) return;
    writeStorage(key, value);
  }, [key, value, isHydrated]);

  const update = useCallback((updater) => {
    setValue((prev) => (typeof updater === "function" ? updater(prev) : updater));
  }, []);

  return [value, update, isHydrated];
}
