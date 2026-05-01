"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Cubie from "./Cubie";
import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { useScroll } from "@react-three/drei";

const dirSpeed = 1;
const F = { axis: 2, slice: 1, dir: -dirSpeed };
const Fp = { axis: 2, slice: 1, dir: dirSpeed };
const U = { axis: 1, slice: 1, dir: -dirSpeed };
const Up = { axis: 1, slice: 1, dir: dirSpeed };
const R = { axis: 0, slice: 1, dir: -dirSpeed };
const Rp = { axis: 0, slice: 1, dir: dirSpeed };
const L = { axis: 0, slice: -1, dir: dirSpeed };
const Lp = { axis: 0, slice: -1, dir: -dirSpeed };
const D = { axis: 1, slice: -1, dir: dirSpeed };
const Dp = { axis: 1, slice: -1, dir: -dirSpeed };
const B = { axis: 2, slice: -1, dir: dirSpeed };
const Bp = { axis: 2, slice: -1, dir: -dirSpeed };

const gemSequence = [
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
  Bp,
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
  B,
  Up,
  F,
  L,
  Bp,
  R,
  D,
  Dp,
  Rp,
  B,
  Lp,
  Fp,
  U,
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
  Up,
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
  Up,
];

export default function HeroCube() {
  const [xPos, setXPos] = useState(0);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<THREE.Group>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const pivotRef = useRef<THREE.Group>(null!);
  const isMoving = useRef(false);
  const currentIndex = useRef(0);
  const activeTween = useRef<gsap.core.Tween | null>(null);
  const scroll = useScroll();
  const { size } = useThree();

  const rotation = useMemo(() => ({ x: 0, y: 0 }), []);

  useEffect(() => {
    const tx = gsap.to(rotation, {
      x: Math.PI * 2,
      duration: (Math.PI * 2) / 0.15,
      ease: "none",
      repeat: -1,
    });
    const ty = gsap.to(rotation, {
      y: Math.PI * 2,
      duration: (Math.PI * 2) / 0.2,
      ease: "none",
      repeat: -1,
    });
    return () => {
      tx.kill();
      ty.kill();
    };
  }, []);

  const cubies = useMemo(() => {
    const items = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue;
          items.push(
            <Cubie key={`${x}-${y}-${z}`} inititalPosition={[x, y, z]} />,
          );
        }
      }
    }
    return items;
  }, []);

  const completeMove = () => {
    [...pivotRef.current.children].forEach((child) => {
      groupRef.current.attach(child);
      child.position.set(
        Math.round(child.position.x),
        Math.round(child.position.y),
        Math.round(child.position.z),
      );
      child.rotation.set(
        Math.round(child.rotation.x / (Math.PI / 2)) * (Math.PI / 2),
        Math.round(child.rotation.y / (Math.PI / 2)) * (Math.PI / 2),
        Math.round(child.rotation.z / (Math.PI / 2)) * (Math.PI / 2),
      );
    });
    pivotRef.current.rotation.set(0, 0, 0);
    isMoving.current = false;
  };

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
      const localPos = groupRef.current.worldToLocal(worldPos.clone());
      const val =
        axis === 0 ? localPos.x : axis === 1 ? localPos.y : localPos.z;
      if (Math.round(val) === slice) targets.push(child);
    });
    targets.forEach((t) => pivotRef.current.attach(t));
    const axisKey = axis === 0 ? "x" : axis === 1 ? "y" : "z";
    activeTween.current?.kill();
    activeTween.current = gsap.to(pivotRef.current.rotation, {
      [axisKey]: (Math.PI / 2) * dir,
      duration: 0.15,
      ease: "power2.inOut",
      onComplete: completeMove,
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden && !isMoving.current) {
        const { axis, slice, dir } = gemSequence[currentIndex.current];
        handleMove(axis, slice, dir);
        currentIndex.current = (currentIndex.current + 1) % gemSequence.length;
      }
    }, 350);
    return () => {
      clearInterval(timer);
      activeTween.current?.kill();
    };
  }, []);

  useEffect(() => {
    setXPos(size.width / size.height);
  }, [size]);

  useFrame(() => {
    containerRef.current.rotation.x = rotation.x;
    containerRef.current.rotation.y = rotation.y;
  });

  return (
    <group
      ref={containerRef}
      scale={[scale, scale, scale]}
      position={[xPos, 0, 0]}
    >
      <group ref={groupRef}>
        <group ref={pivotRef}>{cubies}</group>
      </group>
    </group>
  );
}
