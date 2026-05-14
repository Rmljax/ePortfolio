"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Text, Text3D } from "@react-three/drei";

export default function FinalScroll() {
  const arrowRef = useRef<any>(null!);
  const [scale, setScale] = useState(4);
  const [isVisible, setIsVisible] = useState(false);
  const { camera, size } = useThree();

  useFrame((state) => {
    const bobbing = -2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    arrowRef.current.position.y = -4 + bobbing;

    if (camera.position.x === 8 && camera.position.y === -4) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }

    arrowRef.current.rotation.y += 0.02;
    if (camera.position.z < 10) {
      setScale(Math.max(1, (camera.position.z * 3) / 20 + 2.5));
    }
  });
  return (
    <mesh
      ref={arrowRef}
      rotation={[Math.PI, Math.PI, 0]}
      position={[8, -4, -20]}
      scale={scale}
      visible={isVisible}
    >
      <coneGeometry args={[0.2, 0.4, 3]} />
      <meshStandardMaterial
        color={"#bae6fd"}
        emissive={"#bae6fd"}
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}
