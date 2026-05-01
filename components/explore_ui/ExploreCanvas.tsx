"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import ExploreParticles from "./ExploreParticles";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import { ScrollControls } from "@react-three/drei";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import ExploreHeader from "./ExploreHeader";
export default function ExploreCanvas() {
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(
    undefined,
  );

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  return (
    <div className="relative h-screen w-full bg-slate-950">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 50 }}
        eventSource={eventSource}
      >
        <ExploreHeader />
        <color attach="background" args={["#020618"]} />
        <ExploreParticles count={2000} color={"#6478b"} size={0.05} />
        <ExploreParticles count={500} color={"#bae6fd"} size={0.1} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight
          position={[-10, -10, -10]}
          intensity={1}
          color={"#38bdf8"}
        />
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.9}
            mipmapblur={true}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
