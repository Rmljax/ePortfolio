"use client";
import { Html } from "@react-three/drei";
import React from "react";

interface CubieProjectsProps {
  initialPosition: [number, number, number];
}

export default function CubieProjects({ initialPosition }: CubieProjectsProps) {
  const [x, y, z] = initialPosition;
  return (
    <>
      <Html position={[x, y, z]}>
        <div className="flex space-x-14 fixed">
          <div className="flex border w-10 h-10 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
        </div>
      </Html>
    </>
  );
}
