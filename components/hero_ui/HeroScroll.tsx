"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Text, Text3D } from "@react-three/drei";

export default function HeroScroll() {
  const groupRef = useRef<any>(null!);
  const arrowRef = useRef<any>(null!);

  useFrame((state) => {
    const bobbing = -2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    groupRef.current.position.y = -2 + bobbing;
    arrowRef.current.rotation.y += 0.02;
  });
  return (
    <group ref={groupRef} position={[-8, 2, 2]}>
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
