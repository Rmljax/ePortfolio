"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Text, Text3D, useCursor } from "@react-three/drei";
import { Vector3 } from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== undefined) {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}
export default function HeroScroll() {
  const groupRef = useRef<any>(null!);
  const arrowRef = useRef<any>(null!);
  const [hovered, setHovered] = useState(false);
  const { camera, size } = useThree();

  useCursor(hovered);

  function scrollDown() {
    if (typeof window === "undefined") return;
    const st = ScrollTrigger.getById("camera-scroll");
    if (st) {
      const totalDistance = st.end - st.start;
      const secondPageScroll = st.start + totalDistance * 0.25;
      gsap.to(window, {
        duration: 3,
        scrollTo: secondPageScroll,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(window, {
        duration: 3,
        scrollTo: window.innerHeight * 1.035,
        ease: "power2.inOut",
      });
    }
  }

  useFrame((state) => {
    if (!groupRef.current || !arrowRef.current) return;
    const time = state.clock.elapsedTime;
    let targetX = -8; // Default
    let baseY = -5.2;

    // Responsive logic
    if (size.width <= 320) {
      targetX = -0.9;
      baseY = -4;
    } else if (size.width <= 375) {
      targetX = -1.2;
      baseY = -4.2;
    } else if (size.width <= 596) {
      targetX = -1.4;
      baseY = -4.4;
    } else if (size.width <= 768) {
      targetX = -3;
      baseY = -4.6;
    } else if (size.width <= 1024) {
      targetX = -4;
      baseY = -4.8;
    } else if (size.width <= 1440) {
      targetX = -5;
      baseY = -5.2;
    } else if (size.width <= 2560) targetX = -7;

    // Apply positions: Base + Sine Wave for bobbing
    groupRef.current.position.x = targetX;
    groupRef.current.position.y = baseY + Math.sin(time * 2) * 0.1;

    if (camera.position.y > -4) {
      arrowRef.current.rotation.y += 0.02;
    }
  });
  return (
    <group
      ref={groupRef}
      position={[-8, 0, 0]}
      onClick={(e) => {
        e.stopPropagation();
        scrollDown();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        camera.position.y === 0 ? setHovered(true) : null;
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
      scale={hovered ? 1.03 : 1}
    >
      <mesh rotation={[0, 0.5, -0.02]}>
        <boxGeometry args={[3, 1.3, 1]} />
        <meshStandardMaterial transparent={true} opacity={0} />
      </mesh>
      <Text3D
        rotation={[0, 0.4, 0]}
        font="/fonts/michroma_regular.json"
        size={0.3}
        position={[-1.5, 0.3, 0]}
      >
        EXPLORE
        <meshStandardMaterial
          color={hovered ? "#ffffff" : "#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={hovered ? 1 : 0.8}
          roughness={0.3}
        />
      </Text3D>
      <mesh ref={arrowRef} rotation={[Math.PI, 0, 0]} position={[0, 0, 0]}>
        <coneGeometry args={[0.2, 0.4, 3]} />
        <meshStandardMaterial
          color={hovered ? "#ffffff" : "#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={hovered ? 1 : 0.8}
        />
      </mesh>
    </group>
  );
}
