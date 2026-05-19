"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { Fragment, Suspense, useEffect, useRef, useState } from "react";
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
import FinalScroll from "./FinalScroll";
import ScrollTwo from "./ScrollTwo";
import ScrollThree from "./ScrollThree";
import { div } from "three/tsl";
import Image from "next/image";
import { projects } from "../../data/projects";
import ProjectDescription from "./ProjectDescription";

gsap.registerPlugin(ScrollTrigger);

export default function HeroCanvas() {
  const [eventSource, setEventSource] = useState<HTMLElement | undefined>(
    undefined,
  );
  const [cubeX, setCubeX] = useState(0);
  const [overlayPos, setOverlayPos] = useState({ x: 0, y: 0 });
  const [overlaySize, setOverlaySize] = useState({ w: 0, h: 0 });
  const [mounted, setMounted] = useState(false);
  const [activeProject, setActiveProject] = useState<any>(null);

  useEffect(() => {
    const asp = window.innerWidth / window.innerHeight;

    if (window.innerWidth <= 425) {
      setCubeX(1.3);
    } else if (window.innerWidth <= 768) {
      setCubeX(1.8);
    } else if (window.innerWidth <= 1024) {
      setCubeX(4);
    } else if (window.innerWidth <= 2560) {
      setCubeX(5);
    } else {
      setCubeX(6);
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
          raycaster={{ far: 100 }}
        >
          <CameraController xPos={cubeX} />
          <color attach="background" args={["#020618"]} />
          <HeroParticles count={2000} color={"#6478ba"} size={0.05} />
          <HeroParticles count={2000} color={"#bae6fd"} size={0.1} />
          <ambientLight intensity={0.6} />

          <HeroCube xPos={cubeX} />
          <EarthModel />
          <OverlayTracker
            setOverlayPos={setOverlayPos}
            setMounted={setMounted}
            setOverlaySize={setOverlaySize}
          />
          <HeroScroll />
          <ScrollTwo />
          <ScrollThree xPos={cubeX} />
          <FinalScroll />
          <pointLight position={[15, -7, -15]} intensity={2} color="#ffffff" />
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
          <div className=" -mt-20 md:m-auto h-fit md:w-2/3 rounded-2xl shadow-[inset_0_0_10px_rgba(186,230,253,0.4)]">
            <div className="text-center flex flex-col m-auto rounded-2xl p-8   shadow-[0_0_50px_10px_rgba(186,230,253,0.4)] bg-[rgba(186,230,253,0.05)] backdrop-blur-sm">
              <h1 className="text-[#bae6fd] text-xl md:text-3xl xl:text-3xl 2xl:text-5xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
                Who I am:
              </h1>
              <p className="text-[#bae6fd] text-xs md:text-sm xl:text-lg 2xl:text-xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8] flex flex-col space-y-4 mt-4 ml-4">
                <br />
                I’m a Frontend Engineer with a background in mathematics and
                computer science education. After 5+ years of breaking down
                complex logic for students, I now apply that same architectural
                mindset to building immersive web experiences.
                <br />
                <br />I specialize in the intersection of performance and
                aesthetics—using React, Three.js, and GSAP to turn abstract
                concepts into interactive reality. My transition from educator
                to developer wasn’t just a career change; it was an evolution of
                my passion for logic, problem-solving, and clean design.
              </p>
            </div>
          </div>
        </section>
        <section className="h-screen p-10 text-white" id="target-first">
          <h1 className="ml-[4%] mt-[2%] text-[#bae6fd] text-xl md:text-3xl xl:text-3xl 2xl:text-5xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
            What I do:
          </h1>
        </section>
        <section className="h-screen flex p-10 text-white">
          <h1 className="mx-auto h-fit mt-[4%] text-[#bae6fd] text-xl md:text-3xl xl:text-3xl 2xl:text-5xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
            Where to find me:
          </h1>
        </section>
        <section className="h-screen flex items-center p-10 text-white"></section>
      </div>
      {mounted && (
        <div className="fixed inset-0 pointer-events-none transition ease-in-out z-100">
          <div
            className="absolute pointer-events-none"
            style={{
              left: `${overlayPos.x}px`,
              top: `${overlayPos.y}px`,
              width: `${overlaySize.w * 1.01}px`,
              height: `${overlaySize.h * 1.01}px`,
              transform: `translate(-50%, -50%)`,
              willChange: "left, top, transform",
              transition: "none",
            }}
          >
            <div className="grid grid-cols-3 gap-2 w-full h-full pointer-events-auto">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className="pointer-events-auto m-[11%] bg-white/0  shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.3)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] transition-all cursor-pointer group"
                  onClick={() => {
                    setActiveProject(project);
                  }}
                >
                  <Image
                    src={`${project.image}`}
                    width={100}
                    height={100}
                    alt="day"
                    className=" shadow-[inset_0_0_10px_rgba(186,230,253,0.4)] w-full h-full m-auto blur-sm opacity-50 hover:opacity-70 hover:blur-none transition ease-in-out"
                  />
                  <h2
                    className="absolute pointer-events-none opacity-0 group-hover:opacity-100 text-[#bae6fd] text-md md:text-lg xl:text-xl 2xl:text-2xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8] transition ease-in-out w-100 duration-200"
                    style={{
                      top: `${overlayPos.y - overlaySize.h / 2}px`,
                      left: `${overlayPos.x - overlaySize.w / 3}px`,
                    }}
                  >
                    {project.title}
                  </h2>
                </div>
              ))}{" "}
              <ProjectDescription
                project={activeProject}
                width={overlaySize.w}
                height={overlaySize.h}
                open={!!activeProject}
                setOpen={(val) => {
                  if (!val) setActiveProject(null);
                }}
              />
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
  setOverlaySize,
}: {
  setOverlayPos: (pos: { x: number; y: number }) => void;
  setMounted: (mounted: boolean) => void;
  setOverlaySize: (size: { w: number; h: number }) => void;
}) {
  const { camera, size, scene } = useThree();
  const box = new THREE.Box3();
  const vec = new THREE.Vector3();

  useFrame(() => {
    const cube = scene.getObjectByName("hero-cube-container");
    const isVisible =
      Math.abs(camera.position.x) > 0.1 && camera.position.y === 0;
    setMounted(isVisible);
    if (!cube || !isVisible) return;

    box.setFromObject(cube);

    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;

    const corners = [
      new THREE.Vector3(box.min.x, box.min.y, box.min.z),
      new THREE.Vector3(box.max.x, box.min.y, box.min.z),
      new THREE.Vector3(box.min.x, box.max.y, box.min.z),
      new THREE.Vector3(box.min.x, box.min.y, box.max.z),
      new THREE.Vector3(box.max.x, box.max.y, box.min.z),
      new THREE.Vector3(box.max.x, box.min.y, box.max.z),
      new THREE.Vector3(box.min.x, box.max.y, box.max.z),
      new THREE.Vector3(box.max.x, box.max.y, box.max.z),
    ];

    corners.forEach((corner) => {
      corner.project(camera);
      const x = (corner.x * 0.5 + 0.5) * size.width;
      const y = (corner.y * -0.5 + 0.5) * size.height;
      minX = Math.min(minX, x);
      maxX = Math.max(maxX, x);
      minY = Math.min(minY, y);
      maxY = Math.max(maxY, y);
    });
    setOverlayPos({ x: (minX + maxX) / 2, y: (minY + maxY) / 2 });
    setOverlaySize({ w: maxX - minX, h: maxY - minY });
  }, 1);
  return null;
}
