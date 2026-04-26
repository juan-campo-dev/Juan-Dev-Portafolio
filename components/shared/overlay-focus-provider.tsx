"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

interface OverlayFocusStateValue {
  isOverlayFocused: boolean;
}

interface OverlayFocusActionsValue {
  setOverlayFocus: (id: string, open: boolean) => void;
}

const OverlayFocusStateContext = createContext<OverlayFocusStateValue>({
  isOverlayFocused: false,
});

// Acciones en un context separado: la referencia es estable, así que los
// componentes que solo registran su estado (modales, dialogs) no se
// re-renderizan al abrir/cerrar otros overlays.
const OverlayFocusActionsContext = createContext<OverlayFocusActionsValue>({
  setOverlayFocus: () => undefined,
});

export function OverlayFocusProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOverlayFocused, setIsOverlayFocused] = useState(false);
  const openIdsRef = useRef<Set<string>>(new Set());

  const setOverlayFocus = useCallback((id: string, open: boolean) => {
    const set = openIdsRef.current;
    if (open) set.add(id);
    else set.delete(id);
    const next = set.size > 0;
    setIsOverlayFocused((current) => (current === next ? current : next));
  }, []);

  const stateValue = useMemo(() => ({ isOverlayFocused }), [isOverlayFocused]);
  const actionsValue = useMemo(() => ({ setOverlayFocus }), [setOverlayFocus]);

  return (
    <OverlayFocusActionsContext.Provider value={actionsValue}>
      <OverlayFocusStateContext.Provider value={stateValue}>
        {children}
      </OverlayFocusStateContext.Provider>
    </OverlayFocusActionsContext.Provider>
  );
}

export function useOverlayFocusState() {
  return useContext(OverlayFocusStateContext);
}

export function useOverlayFocus(id: string, open: boolean) {
  const { setOverlayFocus } = useContext(OverlayFocusActionsContext);

  useEffect(() => {
    setOverlayFocus(id, open);

    return () => {
      setOverlayFocus(id, false);
    };
  }, [id, open, setOverlayFocus]);
}
