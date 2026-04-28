"use client";
import * as THREE from "three";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { RoundedBox } from "@react-three/drei";

const COLORS = {
  white: "#f8fafc",
  yellow: "#e5ff00",
  orange: "#ff8400",
  red: "#ff0015",
  blue: "#38bdf8",
  green: "#15b800",
  black: "#0f172a",
};

// We move the color logic inside the component so it can react to its OWN world position
function Cubie({
  initialPosition,
}: {
  initialPosition: [number, number, number];
}) {
  const meshRef = useRef<THREE.Group>(null!);

  // This function checks where the cubie is in the WORLD space to decide sticker colors
  // This is the "magic" that keeps stickers correct after rotations
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
              emissiveIntensity={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function HeroCube() {
  const containerRef = useRef<THREE.Group>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const pivotRef = useRef<THREE.Group>(null!);
  const isMoving = useRef(false);

  // Use a state only to track the "active" animation params
  const [moveMetadata, setMoveMetadata] = useState<{
    axis: number;
    dir: number;
  } | null>(null);

  const cubies = useMemo(() => {
    const items = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          items.push(
            <Cubie key={`${x}${y}${z}`} initialPosition={[x, y, z]} />,
          );
        }
      }
    }
    return items;
  }, []);

  const moveTimer = useRef(0);

  useFrame((state, delta) => {
    containerRef.current.rotation.x += delta * 0.15;
    containerRef.current.rotation.y += delta * 0.2;

    if (moveMetadata) {
      const speed = 10;
      const target = (Math.PI / 2) * moveMetadata.dir;
      const ax =
        moveMetadata.axis === 0 ? "x" : moveMetadata.axis === 1 ? "y" : "z";

      pivotRef.current.rotation[ax] +=
        (target - pivotRef.current.rotation[ax]) * speed * delta;

      // Snap and Complete
      if (Math.abs(target - pivotRef.current.rotation[ax]) < 0.005) {
        pivotRef.current.rotation[ax] = target;
        completeMove();
      }
    }
    if (!isMoving.current) {
      moveTimer.current += delta;

      // Trigger a move every 0.1 seconds (matching your 100ms)
      if (moveTimer.current > 0.1) {
        const { axis, slice, dir } = gemSequence[currentIndex.current];
        handleMove(axis, slice, dir);

        currentIndex.current = (currentIndex.current + 1) % gemSequence.length;
        moveTimer.current = 0; // Reset timer
      }
    }
  });

  const handleMove = (axis: number, slice: number, dir: number) => {
    if (isMoving.current) return;
    isMoving.current = true;

    pivotRef.current.rotation.set(0, 0, 0);
    pivotRef.current.updateMatrixWorld();

    const targets: THREE.Object3D[] = [];
    groupRef.current.children.forEach((child) => {
      if (child === pivotRef.current) return;

      const worldPos = new THREE.Vector3();
      child.getWorldPosition(worldPos);

      // We use the container's inverse matrix to find the local "grid" position
      const localPos = worldPos.clone();
      groupRef.current.worldToLocal(localPos);

      const val =
        axis === 0 ? localPos.x : axis === 1 ? localPos.y : localPos.z;
      if (Math.round(val) === slice) {
        targets.push(child);
      }
    });

    targets.forEach((t) => pivotRef.current.attach(t));
    setMoveMetadata({ axis, dir });
  };

  const completeMove = () => {
    const children = [...pivotRef.current.children];
    children.forEach((child) => {
      groupRef.current.attach(child);

      // FORCE ALIGNMENT: This prevents the cube from falling apart
      // Round position to nearest integer
      child.position.set(
        Math.round(child.position.x),
        Math.round(child.position.y),
        Math.round(child.position.z),
      );

      // Round rotation to nearest 90 degrees
      child.rotation.set(
        Math.round(child.rotation.x / (Math.PI / 2)) * (Math.PI / 2),
        Math.round(child.rotation.y / (Math.PI / 2)) * (Math.PI / 2),
        Math.round(child.rotation.z / (Math.PI / 2)) * (Math.PI / 2),
      );
    });

    pivotRef.current.rotation.set(0, 0, 0);
    setMoveMetadata(null);
    isMoving.current = false;
  };
  const dirSpeed = 1;
  const F = { axis: -1, slice: 1, dir: -dirSpeed };
  const Fp = { axis: -1, slice: 1, dir: dirSpeed };
  const U = { axis: 1, slice: 1, dir: -dirSpeed };
  const Up = { axis: 1, slice: 1, dir: dirSpeed };
  const R = { axis: 0, slice: 1, dir: -dirSpeed };
  const Rp = { axis: 0, slice: 1, dir: dirSpeed };
  const L = { axis: 0, slice: -1, dir: dirSpeed };
  const Lp = { axis: 0, slice: -1, dir: -dirSpeed };
  const D = { axis: 1, slice: -1, dir: dirSpeed };
  const Dp = { axis: 1, slice: -1, dir: -dirSpeed };
  const B = { axis: -1, slice: -1, dir: dirSpeed };
  const Bp = { axis: -1, slice: -1, dir: -dirSpeed };

  const moveSequence = [
    //Scramble
    B,
    Dp,
    Bp,
    F,
    R,
    D,
    D,
    Bp,
    Lp,
    B,
    F,
    F,
    D,
    D,
    F,
    F,
    Up,
    F,
    Up,
    Fp,
    Up,
    D,
    Bp,
    L,
    //Solve
    F,
    R,
    D,
    F,
    Lp,
    Fp,
    D,
    D,
    B,
    B,
    U,
  ];

  const solveSequence = [F, R, D, F, Lp, Fp, D, D, B, B, U];

  const gemSequence = [
    // --- Scramble (Random State) ---
    U,
    R,
    F,
    D,
    L,
    B,
    Up,
    Rp,
    Fp,
    Dp,
    Lp,
    Bp, // 12-move scramble
    U,
    U,
    R,
    R,
    F,
    F,
    D,
    D,
    L,
    L,
    B,
    B, // Adding 180-degree turns
    Up,
    F,
    L,
    Bp,
    R,
    D, // Final scrambling logic

    // --- Solve (The Exact Inverse) ---
    // To solve, we perform the scramble moves in reverse order
    // and reverse their direction (e.g., U becomes Up).
    Dp,
    Rp,
    B,
    Lp,
    Fp,
    U, // Reversing "Final scrambling logic"
    Bp,
    Bp,
    Lp,
    Lp,
    Dp,
    Dp,
    Fp,
    Fp,
    Rp,
    Rp,
    Up,
    Up, // Reversing "Double turns"
    B,
    L,
    D,
    F,
    R,
    U,
    Bp,
    Lp,
    Dp,
    Fp,
    Rp,
    Up, // Reversing "Random State"
  ];

  const currentIndex = useRef(0);
  // Safe interval that doesn't cause a stack overflow
  useEffect(() => {
    // const handleVisibilityChange = () => {
    //   if (document.hidden) {
    //     // Logic to pause if necessary, though clearing the interval is safer
    //   }
    // };

    const timer = setInterval(() => {
      // Only execute move logic if the tab is actually visible
      if (!document.hidden && !isMoving.current) {
        const { axis, slice, dir } = gemSequence[currentIndex.current];
        handleMove(axis, slice, dir);
        currentIndex.current = (currentIndex.current + 1) % gemSequence.length;
      }
    }, 100);

    // document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(timer);
      // document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <group ref={containerRef} scale={[1.2, 1.2, 1.2]} position={[5, 0, 0]}>
      <group ref={groupRef}>
        <group ref={pivotRef} />
        {cubies}
      </group>
    </group>
  );
}
