"use client";

import { ThreeElement, useFrame, useThree } from "@react-three/fiber";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { Text, Text3D, useCursor } from "@react-three/drei";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import * as THREE from "three";
import { Exo_2 } from "next/font/google";

if (typeof window !== undefined) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

interface FinalScrollProps {
  setLightOn: Dispatch<SetStateAction<boolean>>;
}
export default function FinalScroll({ setLightOn }: FinalScrollProps) {
  const arrowUpRef = useRef<THREE.Mesh>(null!);
  const arrowDownRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [scale, setScale] = useState(4);
  const [isVisible, setIsVisible] = useState(false);
  const [upHovered, setUpHovered] = useState(false);
  const [downHovered, setDownHovered] = useState(false);
  const { camera, size } = useThree();

  useCursor(upHovered);
  useCursor(downHovered);

  function scrollDown() {
    if (typeof window === "undefined") return;

    const st = ScrollTrigger.getById("camera-scroll");
    if (camera.position.z === 10) {
      if (st) {
        gsap.to(window, {
          duration: 2,

          scrollTo: { y: st.end, autoKill: true },
          ease: "power2.inOut",
        });
      } else {
        gsap.to(window, {
          duration: 2,
          scrollTo: window.innerHeight * 4.035,
          ease: "power2.inOut",
        });
      }
    } else {
      setLightOn((prev) => !prev);
    }
  }

  function scrollUp() {
    if (typeof window === "undefined") return;

    const st = ScrollTrigger.getById("camera-scroll");
    if (camera.position.z === 10) {
      if (st) {
        const totalDistance = st.end - st.start;
        const thirdPageScroll = st.start + totalDistance * 0.5;
        gsap.to(window, {
          duration: 2,
          scrollTo: thirdPageScroll,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(window, {
          duration: 2,
          scrollTo: window.innerHeight * 2.035,
          ease: "power2.inOut",
        });
      }
    }
    if (camera.position.z === -10) {
      if (st) {
        const totalDistance = st.end - st.start;
        const fourthPageScroll = st.start + totalDistance * 0.75;
        gsap.to(window, {
          duration: 2,
          scrollTo: fourthPageScroll,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(window, {
          duration: 2,
          scrollTo: window.innerHeight * 3.035,
          ease: "power2.inOut",
        });
      }
    }
  }

  useFrame((state) => {
    const bobbing = -2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;

    arrowDownRef.current.position.y = -4 + bobbing;

    if (Math.abs(camera.position.x - 8) < 0.1 && camera.position.y === -4) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    arrowUpRef.current.rotation.y += 0.02;
    arrowDownRef.current.rotation.y -= 0.02;
    if (camera.position.z <= 10) {
      setScale(Math.max(1, (camera.position.z * 3) / 20 + 2.5));
      groupRef.current.position.z = Math.max(-2, camera.position.z / 20 - 1.5);
      arrowUpRef.current.position.y =
        Math.max(-5.4, camera.position.z * 0.07 - 4.7) + 2 + bobbing;
    } else {
      groupRef.current.position.z = Math.max(-2, camera.position.z / 10);
      arrowUpRef.current.position.y = -4;
    }
  });
  return (
    <group position={[8, -1, -20]} ref={groupRef}>
      <mesh
        ref={arrowDownRef}
        rotation={[Math.PI, Math.PI, 0]}
        position={[0, -6, -20]}
        onClick={scrollDown}
        onPointerOver={() => setDownHovered(true)}
        onPointerOut={() => setDownHovered(false)}
        scale={downHovered ? scale * 1.04 : scale}
        visible={isVisible}
      >
        <coneGeometry args={[0.2, 0.4, 3]} />
        <meshStandardMaterial
          color={downHovered ? "#ffffff" : "#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={downHovered ? 1 : 0.8}
        />
      </mesh>
      <mesh
        ref={arrowUpRef}
        position={[0, -4, -20]}
        onClick={scrollUp}
        onPointerOver={() => setUpHovered(true)}
        onPointerOut={() => setUpHovered(false)}
        scale={upHovered ? scale * 1.04 : scale}
        visible={isVisible}
      >
        <coneGeometry args={[0.2, 0.4, 3]} />
        <meshStandardMaterial
          color={upHovered ? "#ffffff" : "#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={upHovered ? 1 : 0.8}
        />
      </mesh>
    </group>
  );
}
