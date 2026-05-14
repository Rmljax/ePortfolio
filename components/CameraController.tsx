"use client";

import { useFrame, useThree } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useLayoutEffect, useState } from "react";

// Register outside to prevent memory leaks/re-registration
gsap.registerPlugin(ScrollTrigger);

interface HeroCubeProps {
  xPos: number;
}

export default function CameraController({ xPos }: HeroCubeProps) {
  const { camera, size } = useThree();
  const pages = [
    { pos: [0, 0, 15], lookAt: [0, 0, 0] },
    { pos: [0, -4, 15], lookAt: [0, -10, 0] },
    { pos: [xPos, 0, 7], lookAt: [xPos, 0, 0] },
    { pos: [8, -4, 10], lookAt: [8, -12, -20] },
    { pos: [8, -4, -10], lookAt: [8, -10, -20] },
  ];

  useLayoutEffect(() => {
    // We create a proxy object to animate the "target" the camera looks at
    const lookAtTarget = {
      x: pages[0].lookAt[0],
      y: pages[0].lookAt[1],
      z: pages[0].lookAt[2],
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#viewport",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        snap: 1 / (pages.length - 1),
      },
      onUpdate: () => {
        // Force the camera to look at our animated proxy on every scroll tick
        camera.lookAt(lookAtTarget.x, lookAtTarget.y, lookAtTarget.z);
        camera.updateProjectionMatrix();
      },
    });

    pages.forEach((target, i) => {
      if (i === 0) return;

      // Move Position and LookAt simultaneously
      tl.to(
        camera.position,
        {
          x: target.pos[0],
          y: target.pos[1],
          z: target.pos[2],
          ease: "none",
        },
        i - 1,
      ); // Start this tween at the start of the increment

      tl.to(
        lookAtTarget,
        {
          x: target.lookAt[0],
          y: target.lookAt[1],
          z: target.lookAt[2],
          ease: "none",
        },
        i - 1,
      );
    });

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [camera]);

  return null;
}
