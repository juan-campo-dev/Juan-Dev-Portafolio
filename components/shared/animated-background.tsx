"use client";

import { useEffect, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Container, Engine } from "@tsparticles/engine";
import { MoveDirection } from "@tsparticles/engine";

export default function AnimatedBackground() {
  const [inited, setInited] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    }).then(() => setInited(true));
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    // Optional logging:
    console.log("Particles loaded", container);
  }, []);

  if (!inited) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={{
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
        }}
        style={{ position: "absolute", inset: 0 }}
      />
    </div>
  );
}
