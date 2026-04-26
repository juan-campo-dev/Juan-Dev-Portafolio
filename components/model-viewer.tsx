"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import SceneSetup from "./scene-setup";
import ModelComponent from "./model-component";
import LoadingPlaceholder from "./loading-placeholder";

export default function ModelViewer({ modelUrl }: { modelUrl: string | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pausa el autoRotate (y por tanto los re-renders del canvas) cuando la
  // sección sale del viewport para no consumir GPU sin necesidad.
  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => setIsVisible(entries[0]?.isIntersecting ?? true),
      { rootMargin: "200px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-black bg-radial-gradient"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? "always" : "demand"}
      >
        <SceneSetup />
        <ambientLight intensity={0.3} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          castShadow
          intensity={1}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={<LoadingPlaceholder />}>
          {modelUrl ? (
            <ModelComponent url={modelUrl} />
          ) : (
            <LoadingPlaceholder />
          )}
        </Suspense>

        <OrbitControls
          minDistance={3}
          maxDistance={10}
          enableZoom={true}
          enablePan={false}
          autoRotate={isVisible}
          autoRotateSpeed={1}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
