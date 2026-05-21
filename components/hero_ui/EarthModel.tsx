import { Text3D, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function EarthModel() {
  const props = useTexture({
    map: "/day.jpg",

    roughnessMap: "/specularClouds.jpg",
  });
  const [scale, setScale] = useState(1);
  const [hovered, setHovered] = useState(false);
  const { size } = useThree();

  const textRef = useRef<THREE.Mesh>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    if (size.width <= 425) {
      setScale(0.5);
    } else if (size.width <= 768) {
      setScale(0.75);
    } else if (size.width <= 768) {
      setScale(1);
    }
  }, []);

  useFrame(({ camera }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;

      if (camera.position.z <= 1) {
        material.transparent = true;

        material.opacity = Math.min(10, Math.abs(camera.position.z - 1) / 1.1);
        meshRef.current.visible = material.opacity > 0;
      } else {
        meshRef.current.visible = false;
      }

      meshRef.current.rotation.y += 0.002;
    }
  });
  return (
    <mesh
      ref={meshRef}
      position={[8, -10, -20]}
      scale={[scale, scale, scale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {" "}
      <sphereGeometry args={[3, 64, 64]} />
      <meshStandardMaterial
        map={props.map}
        roughnessMap={props.roughnessMap}
        metalness={0.4}
        roughness={0.7}
        transparent={true}
        opacity={0}
        emissive="#0f0f0f"
        emissiveIntensity={0.7}
      />
    </mesh>
  );
}
