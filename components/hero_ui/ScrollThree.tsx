"use client";
import { useCursor } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { gsap } from "gsap";
if (typeof window !== undefined) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}
interface ScrollThreeProps {
  xPos: number;
}

export default function ScrollThree({ xPos }: ScrollThreeProps) {
  const [downHovered, setDownHovered] = useState(false);
  const [leftHovered, setLeftHovered] = useState(false);
  const [leftX, setLeftX] = useState(-1.5);
  const [downX, setDownX] = useState(1.5);
  const leftArrowRef = useRef<THREE.Mesh>(null!);
  const downArrowRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [visible, setVisible] = useState(false);
  const { camera } = useThree();
  useCursor(downHovered);
  useCursor(leftHovered);

  function scrollDown() {
    if (typeof window === "undefined") return;
    const st = ScrollTrigger.getById("camera-scroll");
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
  function scrollLeft() {
    if (typeof window === "undefined") return;
    const st = ScrollTrigger.getById("camera-scroll");
    if (st) {
      const totalDistance = st.end - st.start;
      const secondPageScroll = st.start + totalDistance * 0.25;
      gsap.to(window, {
        duration: 2,
        scrollTo: secondPageScroll,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(window, {
        duration: 2,
        scrollTo: window.innerHeight * 1.035,
        ease: "power2.inOut",
      });
    }
  }

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (camera.position.x === xPos) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    groupRef.current.position.y = -2.7 + Math.sin(time * 2) * 0.1;
    leftArrowRef.current.position.x = leftX + Math.sin(time * 2) * 0.05;
    downArrowRef.current.position.x = downX - Math.sin(time * 2) * 0.05;
  });
  return (
    <group ref={groupRef} position={[xPos, -2.7, 0]} visible={visible}>
      <mesh
        ref={downArrowRef}
        position={[downX, 0, 0]}
        rotation={[0, 0, -2.5]}
        onClick={scrollDown}
        onPointerOver={() => setDownHovered(true)}
        onPointerOut={() => setDownHovered(false)}
        scale={downHovered ? 1.05 : 1}
      >
        <coneGeometry args={[0.1, 0.2, 3]} />
        <meshStandardMaterial
          color={downHovered ? "#ffffff" : "#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={downHovered ? 1 : 0.8}
        />
      </mesh>
      <mesh
        ref={leftArrowRef}
        position={[leftX, 0, 0]}
        rotation={[0, 0, 2.5]}
        onClick={scrollLeft}
        onPointerOver={() => setLeftHovered(true)}
        onPointerOut={() => setLeftHovered(false)}
        scale={leftHovered ? 1.05 : 1}
      >
        <coneGeometry args={[0.1, 0.2, 3]} />
        <meshStandardMaterial
          color={leftHovered ? "#ffffff" : "#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={leftHovered ? 1 : 0.8}
        />
      </mesh>
    </group>
  );
}
