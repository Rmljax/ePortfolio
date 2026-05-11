"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import HeroParticles from "./HeroParticles";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import HeroCube from "./HeroCube";
import HeroScroll from "./HeroScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import CameraController from "../CameraController";
import HeroTyping from "./HeroTyping";
import CubieProjects from "./CubieProjects";
import * as THREE from "three";
import EarthModel from "./EarthModel";

gsap.registerPlugin(ScrollTrigger);

export default function HeroCanvas() {
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(
    undefined,
  );
  const [cubeX, setCubeX] = useState(0);
  const [overlayPos, setOverlayPos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const asp = window.innerWidth / window.innerHeight;

    if (window.innerWidth < 768) {
      setCubeX(asp * 1.5);
    } else if (window.innerWidth < 1024) {
      setCubeX(asp * 2.2);
    } else if (window.innerWidth < 1440) {
      setCubeX(asp * 3);
    } else if (window.innerWidth < 2560) {
      setCubeX(asp * 4);
    } else {
      setCubeX(asp * 4);
    }
  }, []);

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
          <CameraController xPos={cubeX} />
          <color attach="background" args={["#020618"]} />
          <HeroParticles count={2000} color={"#6478ba"} size={0.05} />
          <HeroParticles count={2000} color={"#bae6fd"} size={0.1} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={2} />
          <pointLight
            position={[-10, -10, -10]}
            intensity={1}
            color={"#38bdf8"}
          />
          <HeroCube xPos={cubeX} />
          <EarthModel />
          <OverlayTracker
            setOverlayPos={setOverlayPos}
            setMounted={setMounted}
          />
          <HeroScroll />
          <pointLight position={[15, -5, -15]} intensity={2} color="#ffffff" />
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
        <section className="h-screen items-center p-10 text-white mt-8 md:ml-[8%]">
          <h1 className="text-[#bae6fd] text-2xl md:text-3xl xl:text-4xl 2xl:text-6xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
            RYAN <br /> LOCKENBACH
          </h1>
          <HeroTyping />
        </section>
        <section className="h-screen flex items-center p-10 text-white">
          <div className="flex -mt-20 md:m-auto space-x-100 h-3/4">
            <div className="text-center flex flex-col md:w-1/2 m-auto rounded-2xl p-8 border border-[rgba(186,230,253,0.1)] animate-shadow-pulse shadow-[0_0_50px_10px_rgba(186,230,253,0.4)] bg-[rgba(186,230,253,0.05)] backdrop-blur-[2px]">
              <h1 className="text-[#bae6fd] text-xl md:text-2xl xl:text-3xl 2xl:text-5xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
                Who I am:
              </h1>
              <p className="text-[#bae6fd] text-xs md:text-md xl:text-lg 2xl:text-xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8] flex flex-col space-y-4 mt-4 ml-4">
                I am a Frontend Engineer with an eye for detail and a focus on
                creating user-friendly interfaces.
                <br />
                <br />I have 5+ years in education where I've delved into high
                level math and computer science logic.
                <br />
                <br />I have used my skills gained as an educator to advance my
                skills at light speed on my journey to becoming a developer.
              </p>
            </div>
          </div>
        </section>
        <section className="h-screen flex items-center p-10 text-white relative"></section>
        <section className="h-screen flex items-center p-10 text-white">
          <h1 className="m-auto text-[#bae6fd] text-sm md:text-md xl:text-lg 2xl:text-xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
            Hold on tight!
          </h1>
        </section>
        <section className="h-screen flex items-center p-10 text-white"></section>
      </div>
      {mounted && (
        <div className="fixed inset-0 pointer-events-none z-[100]">
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${overlayPos.x}px`,
              top: `${overlayPos.y}px`,
              transform: `translate(-50%, -50%)`,
              willChange: "left, top, transform",
              transition: "none",
              width: "630px",
              height: "630px",
            }}
          >
            <div className="grid grid-cols-3 gap-14 w-full h-full pointer-events-auto">
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="pointer-events-auto bg-white/0 border border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.3)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] transition-all cursor-pointer"
                />
              ))}{" "}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function OverlayTracker({
  setOverlayPos,
  setMounted,
}: {
  setOverlayPos: (pos: { x: number; y: number }) => void;
  setMounted: (mounted: boolean) => void;
}) {
  const { camera, size, scene } = useThree();
  const vec = new THREE.Vector3();

  useFrame(() => {
    const cube = scene.getObjectByName("hero-cube-container");
    const isVisible =
      Math.abs(camera.position.x) > 0.1 && camera.position.y === 0;
    setMounted(isVisible);
    if (!cube || !isVisible) return;

    cube.getWorldPosition(vec);

    vec.project(camera);

    const newX = (vec.x * 0.5 + 0.5) * size.width;
    const newY = (vec.y * -0.5 + 0.5) * size.height;

    setOverlayPos({ x: newX, y: newY });
  }, 1);
  return null;
}
