"use client";
import { RoundedBox } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const COLORS = {
  white: "#bbbbbb",
  yellow: "#bbbb00",
  orange: "#FF5900",
  red: "#B90000",
  blue: "#004fAf",
  green: "#009f4f",
  black: "#0f172a",
};

interface CubieProps {
  initialPosition: [number, number, number];
}

export default function Cubie({ initialPosition }: CubieProps) {
  const meshRef = useRef<THREE.Group>(null!);

  const getStickers = () => {
    const [x, y, z] = initialPosition;
    return [
      {
        axis: [1, 0, 0],
        rot: [0, Math.PI / 2, 0],
        color: x === 1 ? COLORS.red : null,
      },
      {
        axis: [-1, 0, 0],
        rot: [0, -Math.PI / 2, 0],
        color: x === -1 ? COLORS.orange : null,
      },
      {
        axis: [0, 1, 0],
        rot: [-Math.PI / 2, 0, 0],
        color: y === 1 ? COLORS.white : null,
      },
      {
        axis: [0, -1, 0],
        rot: [Math.PI / 2, 0, 0],
        color: y === -1 ? COLORS.yellow : null,
      },
      { axis: [0, 0, 1], rot: [0, 0, 0], color: z === 1 ? COLORS.green : null },
      {
        axis: [0, 0, -1],
        rot: [0, Math.PI, 0],
        color: z === -1 ? COLORS.blue : null,
      },
    ];
  };

  const stickerData = useMemo(() => getStickers(), []);

  return (
    <group ref={meshRef} position={initialPosition}>
      <RoundedBox args={[0.92, 0.92, 0.92]} radius={0.08} smoothness={4}>
        <meshPhysicalMaterial color={COLORS.black} roughness={0.2} />
      </RoundedBox>

      {stickerData.map(({ axis, rot, color }, i) => {
        if (!color) return null;
        return (
          <mesh
            key={i}
            position={axis.map((v) => v * 0.462) as [number, number, number]}
            rotation={rot as unknown as THREE.Euler}
          >
            <boxGeometry args={[0.75, 0.75, 0.01]} />
            <meshPhysicalMaterial
              color={color}
              roughness={0.1}
              metalness={0.1}
              emissive={color}
              emissiveIntensity={0.9}
            />
          </mesh>
        );
      })}
    </group>
  );
}
