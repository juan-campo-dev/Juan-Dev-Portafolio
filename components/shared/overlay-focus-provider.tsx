"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface OverlayFocusContextValue {
  isOverlayFocused: boolean;
  setOverlayFocus: (id: string, open: boolean) => void;
}

const OverlayFocusContext = createContext<OverlayFocusContextValue>({
  isOverlayFocused: false,
  setOverlayFocus: () => undefined,
});

export function OverlayFocusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openOverlayIds, setOpenOverlayIds] = useState<Set<string>>(
    () => new Set(),
  );

  const setOverlayFocus = useCallback((id: string, open: boolean) => {
    setOpenOverlayIds((current) => {
      const next = new Set(current);

      if (open) {
        next.add(id);
      } else {
        next.delete(id);
      }

      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      isOverlayFocused: openOverlayIds.size > 0,
      setOverlayFocus,
    }),
    [openOverlayIds.size, setOverlayFocus],
  );

  return (
    <OverlayFocusContext.Provider value={value}>
      {children}
    </OverlayFocusContext.Provider>
  );
}

export function useOverlayFocusState() {
  return useContext(OverlayFocusContext);
}

export function useOverlayFocus(id: string, open: boolean) {
  const { setOverlayFocus } = useOverlayFocusState();

  useEffect(() => {
    setOverlayFocus(id, open);

    return () => {
      setOverlayFocus(id, false);
    };
  }, [id, open, setOverlayFocus]);
}
