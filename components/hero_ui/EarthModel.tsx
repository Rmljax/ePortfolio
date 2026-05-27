import { Text3D, useCursor, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface EarthModelProps {
  setContactOpen: (contactOpen: boolean) => void;
  contactOpen: boolean;
  lightOn: boolean;
}
export default function EarthModel({
  setContactOpen,
  contactOpen,
  lightOn,
}: EarthModelProps) {
  const props = useTexture({
    map: contactOpen || !lightOn ? "/night.jpg" : "/day.jpg",

    roughnessMap: "/specularClouds.jpg",
  });
  const [scale, setScale] = useState(1);
  const [hovered, setHovered] = useState(false);
  const { size } = useThree();
  const meshRef = useRef<THREE.Mesh>(null!);

  useCursor(hovered);

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
      onClick={() => setContactOpen(true)}
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
        emissive={`${contactOpen || !lightOn ? "#010101" : "#0f0f0f"}`}
        emissiveIntensity={0.7}
      />
    </mesh>
  );
}
