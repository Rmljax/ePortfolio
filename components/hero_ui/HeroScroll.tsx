"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Text } from "@react-three/drei";

function ScrollArrow() {
  const ref = useRef<any>(null!);
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [zPos, setZPos] = useState(0);
  const [scale, setScale] = useState(1);
  const { size } = useThree();

  useEffect(() => {
    const asp = size.width / size.height;

    if (size.width < 768) {
      setScale(0.5);
      setXPos(asp * -3.5);
      setYPos(asp * 7.5);
      setZPos(asp * 7.5);
    } else if (size.width < 1024) {
      setScale(0.5);
      setXPos(asp * -3.5);
      setYPos(asp * 5.5);
      setZPos(asp * 5.5);
    } else if (size.width < 1440) {
      setScale(0.67);
      setXPos(asp * -2.5);
      setYPos(asp * 5.5);
      setZPos(asp * 5.5);
    } else if (size.width < 2560) {
      setScale(0.67);
      setXPos(asp * -2.5);
      setYPos(asp * 5);
      setZPos(asp * 5);
    } else {
      setScale(0.67);
      setXPos(asp * -2.5);
      setYPos(asp * 5);
      setZPos(asp * 5);
    }
  }, [size]);

  useFrame((state) => {
    // Elegant bobbing motion
    ref.current.position.y = -2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    ref.current.rotation.y += 0.01;
  });

  return (
    <mesh
      ref={ref}
      rotation={[Math.PI, 5, 0]}
      position={[xPos, yPos, zPos]}
      scale={[scale, scale, scale]}
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
  const [xPos, setXPos] = useState(0);
  const [yPos, setYPos] = useState(0);
  const [zPos, setZPos] = useState(0);
  const [scale, setScale] = useState(1);
  const { size } = useThree();

  useEffect(() => {
    const asp = size.width / size.height;

    if (size.width < 768) {
      setScale(0.5);
      setXPos(asp * -4);
      setYPos(asp * 4);
      setZPos(asp * 4);
    } else if (size.width < 1024) {
      setScale(0.5);
      setXPos(asp * -4);
      setYPos(asp * 4);
      setZPos(asp * 4);
    } else if (size.width < 1440) {
      setScale(0.67);
      setXPos(asp * -3);
      setYPos(asp * 4);
      setZPos(asp * 4);
    } else if (size.width < 2560) {
      setScale(0.67);
      setXPos(asp * -3);
      setYPos(asp * 4);
      setZPos(asp * 4);
    } else {
      setScale(0.67);
      setXPos(asp * -3);
      setYPos(asp * 4);
      setZPos(asp * 4);
    }
  }, [size]);

  useFrame((state) => {
    textRef.current.position.y =
      -2 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
  });

  return (
    <mesh
      ref={textRef}
      position={[xPos, yPos, zPos]}
      scale={[scale, scale, scale]}
    >
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

export default function HeroScroll() {
  return (
    <>
      <ScrollArrow />
      <ScrollText />
    </>
  );
}
