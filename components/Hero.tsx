import React from "react";
import HeroCanvas from "./hero_ui/HeroCanvas";
import HeroTyping from "./hero_ui/HeroTyping";

export default function Hero() {
  return (
    <div className="max-w-350 mx-[4%] h-dvh flex justify-between overflow-visible ">
      <div className="mt-8 pointer-events-none">
        <h1
          className="text-[#bae6fd] text-4xl md:text-5xl xl:text-7xl 2xl:text-9xl
  [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]"
        >
          RYAN <br /> LOCKENBACH
        </h1>
        <HeroTyping />
      </div>
      <div className="absolute left-0 w-dvw  overflow-visible mx-0 -z-10 h-dvh">
        <HeroCanvas />
      </div>
    </div>
  );
}
