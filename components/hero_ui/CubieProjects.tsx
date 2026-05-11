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
        <div className="flex flex-col m-auto min-[1024px]:w-[320px] min-[1440px]:w-[640px] min-[2560px]:w-[640px] h-3/4 space-y-13">
          <div className="flex h-1/3 space-x-14">
            <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
            <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
            <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
          </div>
          <div className="flex h-1/3 space-x-14">
            <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
            <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
            <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
          </div>
          <div className="flex h-1/3 space-x-14">
            <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
            <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
            <div className="flex border w-1/3 border-[rgba(186,230,253,0.2)] shadow-[0_0_15px_5px_rgba(186,230,253,0.5)] hover:bg-[rgba(186,230,253,0.5)] hover:shadow-[0_0_20px_10px_rgba(186,230,253,0.5)] hover:border-[rgba(186,230,253,0.2)] transition ease-in-out"></div>
          </div>
        </div>
      </Html>
    </>
  );
}
