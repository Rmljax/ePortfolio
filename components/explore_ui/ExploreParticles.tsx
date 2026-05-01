"use client";
import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";

interface HeroParticlesProps {
  count: number;
  color: string;
  size: number;
}

export default function ExploreParticles({
  count = 5000,
  color,
  size,
}: HeroParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!);
  const materialsRef = useRef<THREE.PointsMaterial>(null!);

  const speed = new Array(count).fill(Math.random() * 0.1 + 0.05);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    pointsRef.current.rotation.x += delta * 0.01;
    pointsRef.current.rotation.y += delta * speed[pointsRef.current.id];
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        ref={materialsRef}
        transparent
        size={size}
        color={color}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
