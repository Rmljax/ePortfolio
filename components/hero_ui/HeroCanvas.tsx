"use client";
import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import HeroParticles from "./HeroParticles";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import HeroCube from "./HeroCube";
import HeroScroll from "./HeroScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import CameraController from "../CameraController";

gsap.registerPlugin(ScrollTrigger);

export default function HeroCanvas() {
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(
    undefined,
  );

  useEffect(() => {
    setEventSource(document.body);
  }, []);

  return (
    <>
      <div className="fixed inset-0 h-screen w-full bg-slate-950 z-0">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 50 }}
          eventSource={eventSource}
        >
          <CameraController />
          <color attach="background" args={["#020618"]} />
          <HeroParticles count={2000} color={"#6478b"} size={0.05} />
          <HeroParticles count={500} color={"#bae6fd"} size={0.1} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <pointLight
            position={[-10, -10, -10]}
            intensity={1}
            color={"#38bdf8"}
          />
          <HeroCube />
          <HeroScroll />
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

      <div id="viewport" className="relative z-10 w-full">
        <section className="h-screen flex items-center p-10 text-white">
          <h1>Page 1</h1>
        </section>
        <section className="h-screen flex items-center p-10 text-white">
          <h1>Page 2</h1>
        </section>
        <section className="h-screen flex items-center p-10 text-white">
          <h1>Page 3</h1>
        </section>
      </div>
    </>
  );
}
