"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Text } from "@react-three/drei";

function ScrollArrow() {
  const ref = useRef<any>(null!);
  useFrame((state) => {
    // Elegant bobbing motion
    ref.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={ref}
      rotation={[Math.PI, 5, 0]}
      position={[-3, 0, 9]}
      scale={[0.5, 0.5, 0.5]}
    >
      <coneGeometry args={[0.2, 0.4, 3]} />
      <meshStandardMaterial
        color={"#bae6fd"}
        emissive={"#bae6fd"}
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}
function ScrollText() {
  const textRef = useRef<any>(null!);

  useFrame((state) => {
    textRef.current.position.y =
      -2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });
  return (
    <mesh ref={textRef} position={[-3.5, 0, 8]} scale={[0.5, 0.5, 0.5]}>
      <Text
        fontSize={0.4}
        color={"#bae6fd"}
        anchorX="center"
        anchorY="middle"
        maxWidth={4}
      >
        EXPLORE
        <meshStandardMaterial
          emissive={"#bae6fd"}
          emissiveIntensity={1.2}
          roughness={0.3}
        />
      </Text>
    </mesh>
  );
}

export default function ExploreHeader() {
  return (
    <>
      <ScrollArrow />
      <ScrollText />
    </>
  );
}
