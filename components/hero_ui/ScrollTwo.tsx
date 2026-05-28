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
  const [upHovered, setUpHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const rightArrowRef = useRef<THREE.Mesh>(null!);
  const upArrowRef = useRef<THREE.Mesh>(null!);
  const [rightX, setRightX] = useState(7);
  const [rightY, setRightY] = useState(0);
  const [upX, setUpX] = useState(-7);
  const [upY, setUpY] = useState(0);
  const groupRef = useRef<THREE.Group>(null!);
  const { camera, size } = useThree();
  useCursor(rightHovered);
  useCursor(upHovered);

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
  function scrollUp() {
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
    if (camera.position.y === -4 && camera.position.x === 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
    if (size.width <= 320) {
      setRightX(2);
      setUpX(-2);
      setRightY(-12);
      setUpY(-12);
    } else if (size.width <= 375) {
      setRightX(2);
      setUpX(-2);
      setRightY(-11);
      setUpY(-11);
    } else if (size.width <= 596) {
      setRightX(1.3);
      setUpX(-1.3);
      setRightY(1);
      setUpY(1);
    } else if (size.width <= 768) {
      setRightX(2);
      setUpX(-2);
      setRightY(0);
      setUpY(0);
    } else if (size.width <= 1024) {
      setRightX(4);
      setUpX(-4);
      setRightY(0);
      setUpY(0);
    } else if (size.width <= 1440) {
      setRightX(6);
      setUpX(-6);
      setRightY(1);
      setUpY(1);
    } else if (size.width <= 2560) {
      setRightX(7);
      setUpX(-7);
      setRightY(1.3);
      setUpY(1.3);
    }

    rightArrowRef.current.position.y = rightY + Math.sin(time * 2) * 0.1;
    upArrowRef.current.position.y = upY + Math.sin(time * 2) * 0.1;
  });
  return (
    <group ref={groupRef} position={[0, -7, 0]} visible={visible}>
      <mesh
        ref={rightArrowRef}
        position={[rightX, rightY, 0]}
        rotation={[0.1, 0.1, 0]}
        scale={rightHovered ? 1.05 : 1}
        onClick={scrollRight}
        onPointerOver={() => setRightHovered(true)}
        onPointerOut={() => setRightHovered(false)}
      >
        <coneGeometry args={[0.2, 0.4, 3]} />
        <meshStandardMaterial
          color={rightHovered ? "#ffffff" : "#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={rightHovered ? 1 : 0.8}
        />
      </mesh>
      <mesh
        ref={upArrowRef}
        position={[upX, upY, 0]}
        rotation={[-0.1, -0.1, 0]}
        scale={upHovered ? 1.05 : 1}
        onClick={scrollUp}
        onPointerOver={() => setUpHovered(true)}
        onPointerOut={() => setUpHovered(false)}
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
