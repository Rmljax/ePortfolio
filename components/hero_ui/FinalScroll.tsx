"use client";

import { ThreeElement, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Text, Text3D, useCursor } from "@react-three/drei";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/all";
import { gsap } from "gsap";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function FinalScroll() {
  const arrowRef = useRef<any>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const [scale, setScale] = useState(4);
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { camera, size } = useThree();

  useCursor(hovered);

  function scrollDown() {
    console.log("Scroll Clicked");
    const st = ScrollTrigger.getById("camera-scroll");
    if (st) {
      // Go directly to the total end of the timeline's scroll range
      gsap.to(window, {
        duration: 1.5,
        // Pass {y: st.end} to resolve the 'Window' error
        scrollTo: { y: st.end, autoKill: true },
        ease: "power2.inOut",
      });
    }
  }

  useFrame((state) => {
    const bobbing = -2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    arrowRef.current.position.y = -4 + bobbing;

    if (Math.abs(camera.position.x - 8) < 0.1 && camera.position.y === -4) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    arrowRef.current.rotation.y += 0.02;
    if (camera.position.z < 10) {
      setScale(Math.max(1, (camera.position.z * 3) / 20 + 2.5));
      groupRef.current.position.z = -4;
    }
  });
  return (
    <group
      position={[8, -1, -20]}
      ref={groupRef}
      // Handle the clicks on the parent GROUP
      onClick={scrollDown}
      onPointerOver={() => (camera.position.z === 10 ? setHovered(true) : null)}
      onPointerOut={() => setHovered(false)}
      scale={hovered ? 1.01 : 1}
    >
      <mesh
        ref={arrowRef}
        rotation={[Math.PI, Math.PI, 0]}
        position={[0, 0, -20]}
        scale={scale}
        visible={isVisible}
      >
        <coneGeometry args={[0.2, 0.4, 3]} />
        <meshStandardMaterial
          color={hovered ? "#ffffff" : "#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}
