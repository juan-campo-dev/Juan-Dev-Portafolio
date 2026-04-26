"use client";

import { memo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useOverlayFocusState } from "@/components/shared/overlay-focus-provider";

const CursorFollower = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { isOverlayFocused } = useOverlayFocusState();
  // Mantenemos el flag en un ref para no recrear el listener cuando cambia.
  const overlayRef = useRef(false);
  overlayRef.current = isOverlayFocused;

  useEffect(() => {
    if (typeof window === "undefined") return;
    let frame = 0;
    let nextX = 0;
    let nextY = 0;
    let scheduled = false;

    const apply = () => {
      scheduled = false;
      const node = ref.current;
      if (!node) return;
      // Usamos transform (compositeado en GPU) en lugar de top/left para no
      // disparar layout/paint en cada frame.
      node.style.transform = `translate3d(${nextX}px, ${nextY}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      // Cuando hay un modal abierto el cursor custom esta oculto: no
      // necesitamos repintarlo y asi liberamos main thread (mejora FPS
      // dentro del modal y elimina la sensacion de cursor lagueado).
      if (overlayRef.current) return;
      nextX = e.clientX;
      nextY = e.clientY;
      if (!scheduled) {
        scheduled = true;
        frame = window.requestAnimationFrame(apply);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="fixed left-0 top-0 z-[9999] pointer-events-none will-change-transform"
      style={{ transform: "translate3d(-100px,-100px,0)" }}
    >
      <motion.div
        className="rounded-full bg-neon-blue opacity-70 mix-blend-screen will-change-transform"
        style={{
          width: "20px",
          height: "20px",
          marginLeft: "-10px",
          marginTop: "-10px",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default memo(CursorFollower);
