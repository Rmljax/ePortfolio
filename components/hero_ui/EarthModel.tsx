import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function EarthModel() {
  const props = useTexture({
    map: "/day.jpg",

    roughnessMap: "/specularClouds.jpg",
  });

  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ camera }) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.MeshStandardMaterial;

      if (camera.position.z < -5) {
        material.transparent = true;
        material.opacity = Math.min(1, Math.abs(camera.position.z + 5) / 5);
        meshRef.current.visible = material.opacity > 0;
      } else {
        meshRef.current.visible = false;
      }

      meshRef.current.rotation.y += 0.002;
    }
  });
  return (
    <mesh ref={meshRef} position={[8, -10, -20]}>
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
        emissiveIntensity={1}
      />
    </mesh>
  );
}
