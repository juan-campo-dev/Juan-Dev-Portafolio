"use client";

import { memo, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";
import { MoveDirection } from "@tsparticles/engine";

// Memoizamos las options fuera del componente: la referencia no cambia entre
// renders, así <Particles> nunca se reinicializa innecesariamente.
const PARTICLES_OPTIONS = {
  background: { color: { value: "transparent" } },
  fpsLimit: 60,
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: false },
      resize: { enable: true, delay: 0 },
    },
    modes: {
      grab: { distance: 140, links: { opacity: 1 } },
      repulse: { distance: 200, duration: 0.4 },
    },
  },
  particles: {
    number: {
      value: 80,
      density: { enable: true, width: 800, height: 600 },
    },
    color: { value: "#00F0FF" },
    shape: { type: "circle" },
    opacity: { value: 0.5 },
    size: { value: { min: 1, max: 3 } },
    links: {
      enable: true,
      distance: 150,
      color: "#00F0FF",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: MoveDirection.none,
      outModes: { default: "bounce" },
    },
  },
  detectRetina: true,
} as const;

const PARTICLES_STYLE = { position: "absolute", inset: 0 } as const;

function AnimatedBackground() {
  const [inited, setInited] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Diferimos hasta que el browser esté idle para no competir con LCP/hidratación.
    const start = () => {
      initParticlesEngine(async (engine: Engine) => {
        await loadSlim(engine);
      }).then(() => {
        if (!cancelled) setInited(true);
      });
    };
    const ric = (window as any).requestIdleCallback as
      | ((cb: () => void, opts?: { timeout: number }) => number)
      | undefined;
    const handle = ric
      ? ric(start, { timeout: 1500 })
      : window.setTimeout(start, 600);

    return () => {
      cancelled = true;
      if (ric) (window as any).cancelIdleCallback?.(handle);
      else window.clearTimeout(handle as number);
    };
  }, []);

  if (!inited) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <Particles
        id="tsparticles"
        options={PARTICLES_OPTIONS as never}
        style={PARTICLES_STYLE as React.CSSProperties}
      />
    </div>
  );
}

export default memo(AnimatedBackground);
