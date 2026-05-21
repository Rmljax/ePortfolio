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
export default function ScrollThree() {
  const [rightHovered, setRightHovered] = useState(false);
  const [leftHovered, setLeftHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const groupRef = useRef<THREE.Group>(null!);
  const { camera } = useThree();
  useCursor(rightHovered);
  useCursor(leftHovered);

  function scrollRight() {
    if (typeof window === "undefined") return;

    const st = ScrollTrigger.getById("camera-scroll");
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
  function scrollLeft() {
    if (typeof window === "undefined") return;

    const st = ScrollTrigger.getById("camera-scroll");
    if (st) {
      const firstPageScroll = st.start;
      gsap.to(window, {
        duration: 2,
        scrollTo: firstPageScroll,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(window, {
        duration: 2,
        scrollTo: 0,
        ease: "power2.inOut",
      });
    }
  }

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (camera.position.y === -4) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    groupRef.current.position.x = 9 + Math.sin(time * 2) * 0.1;
  });
  return (
    <group ref={groupRef} position={[0, -15, 0]} visible={visible}>
      <mesh
        position={[0, 0, 0]}
        rotation={[0.5, 0, (3 * Math.PI) / 2]}
        scale={rightHovered ? 1.05 : 1}
        onClick={scrollRight}
        onPointerOver={() => setRightHovered(true)}
        onPointerOut={() => setRightHovered(false)}
      >
        <coneGeometry args={[0.3, 0.5, 3]} />
        <meshStandardMaterial
          color={rightHovered ? "#ffffff" : "#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={0.8}
        />
      </mesh>
      <mesh
        position={[-18, 0, 0]}
        rotation={[0.5, 0, -(3 * Math.PI) / 2]}
        scale={leftHovered ? 1.05 : 1}
        onClick={scrollLeft}
        onPointerOver={() => setLeftHovered(true)}
        onPointerOut={() => setLeftHovered(false)}
      >
        <coneGeometry args={[0.3, 0.5, 3]} />
        <meshStandardMaterial
          color={leftHovered ? "#ffffff" : "#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}
