"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Text, Text3D } from "@react-three/drei";

export default function HeroScroll() {
  const groupRef = useRef<any>(null!);
  const arrowRef = useRef<any>(null!);
  const { camera, size } = useThree();

  useFrame((state) => {
    const bobbing = -2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    groupRef.current.position.y = -2 + bobbing;
    if (size.width <= 320) {
      groupRef.current.position.x = -0.9;
      groupRef.current.position.y = -5.2;
    } else if (size.width <= 375) {
      groupRef.current.position.x = -1.2;
      groupRef.current.position.y = -5.2;
    } else if (size.width <= 596) {
      groupRef.current.position.x = -1.4;
      groupRef.current.position.y = -5.2;
    } else if (size.width <= 768) {
      groupRef.current.position.x = -3;
      groupRef.current.position.y = -5.2;
    } else if (size.width <= 1024) {
      groupRef.current.position.x = -4;
      groupRef.current.position.y = -5.2;
    } else if (size.width <= 1440) {
      groupRef.current.position.x = -5;
      groupRef.current.position.y = -5.2;
    } else if (size.width <= 2560) {
      groupRef.current.position.x = -7;
      groupRef.current.position.y = -5.2;
    }

    if (camera.position.y > -4) {
      arrowRef.current.rotation.y += 0.02;
    }
  });
  return (
    <group ref={groupRef} position={[-8, 0, 0]}>
      <Text3D
        rotation={[0, 0.4, 0]}
        font="/fonts/michroma_regular.json"
        size={0.3}
        position={[-1.5, 0.3, 0]}
      >
        EXPLORE
        <meshStandardMaterial
          color={"#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={0.8}
          roughness={0.3}
        />
      </Text3D>
      <mesh ref={arrowRef} rotation={[Math.PI, 0, 0]} position={[0, 0, 0]}>
        <coneGeometry args={[0.2, 0.4, 3]} />
        <meshStandardMaterial
          color={"#bae6fd"}
          emissive={"#bae6fd"}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
}
