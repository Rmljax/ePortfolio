"use client";
import { useCursor } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/all";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface ScrollThreeProps {
  xPos: number;
}

export default function ScrollThree({ xPos }: ScrollThreeProps) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef<THREE.Group>(null!);
  const [visible, setVisible] = useState(false);
  const { camera } = useThree();
  useCursor(hovered);

  function scrollLeft() {
    const st = ScrollTrigger.getById("camera-scroll");
    if (st) {
      const totalDistance = st.end - st.start;
      const secondPageScroll = st.start + totalDistance * 0.75;
      gsap.to(window, {
        duration: 1.2,
        scrollTo: secondPageScroll,
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
  });
  return (
    <group
      ref={groupRef}
      position={[5, -2.7, 0]}
      rotation={[Math.PI, 0, 0]}
      onClick={scrollLeft}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.05 : 1}
      visible={visible}
    >
      <mesh>
        <coneGeometry args={[0.1, 0.2, 3]} />
        <meshStandardMaterial
          color={hovered ? "#ffffff" : "#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}
