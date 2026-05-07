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
import HeroTyping from "./HeroTyping";

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
          <HeroParticles count={2000} color={"#bae6fd"} size={0.1} />
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
        <section className="h-screen items-center p-10 text-white mt-8 ml-[8%]">
          <h1 className="text-[#bae6fd] text-2xl md:text-3xl xl:text-4xl 2xl:text-6xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
            RYAN <br /> LOCKENBACH
          </h1>
          <HeroTyping />
        </section>
        <section className="h-screen flex items-center p-10 text-white">
          <div className="flex m-auto space-x-100 h-dvh">
            <div className="flex flex-col h-2/3 my-auto rounded-2xl p-16 border border-[rgba(186,230,253,0.1)] animate-shadow-pulse shadow-[0_0_50px_10px_rgba(186,230,253,0.4)] bg-[rgba(186,230,253,0.05)] backdrop-blur-[2px]">
              <h1 className="text-[#bae6fd] text-xl md:text-2xl xl:text-3xl 2xl:text-5xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
                Who I am:
              </h1>
              <ul className="text-[#bae6fd] text-sm md:text-md xl:text-lg 2xl:text-xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8] flex flex-col space-y-4 mt-4 ml-4">
                <li>One thing</li>
                <li>One thing</li>
                <li>One thing</li>
                <li>One thing</li>
                <li>One thing</li>
              </ul>
            </div>
            <div className="flex flex-col h-2/3 my-auto rounded-2xl p-16 border border-[rgba(186,230,253,0.1)] animate-shadow-pulse shadow-[0_0_50px_10px_rgba(186,230,253,0.4)] bg-[rgba(186,230,253,0.05)] backdrop-blur-[2px]">
              <h1 className="text-[#bae6fd] text-xl md:text-2xl xl:text-3xl 2xl:text-5xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
                What I do:
              </h1>
              <ul className="text-[#bae6fd] text-sm md:text-md xl:text-lg 2xl:text-xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8] flex flex-col space-y-4 mt-4 ml-4">
                <li>One thing</li>
                <li>One thing</li>
                <li>One thing</li>
                <li>One thing</li>
                <li>One thing</li>
              </ul>
            </div>
          </div>
        </section>
        <section className="h-screen flex items-center p-10 text-white">
          <div className="flex flex-col m-auto w-[630px] h-3/4 space-y-13">
            <div className="flex h-1/3 space-x-14">
              <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
              <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
              <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
            </div>
            <div className="flex h-1/3 space-x-14">
              <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
              <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
              <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
            </div>
            <div className="flex h-1/3 space-x-14">
              <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
              <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
              <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
            </div>
          </div>
        </section>
        <section className="h-screen flex items-center p-10 text-white">
          <h1 className="m-auto text-[#bae6fd] text-sm md:text-md xl:text-lg 2xl:text-xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
            Hold on tight!
          </h1>
        </section>
        <section className="h-screen flex items-center p-10 text-white">
          <h1>Page 5</h1>
        </section>
      </div>
    </>
  );
}
