import React from "react";
import HeroCanvas from "./ui/HeroCanvas";
import HeroTyping from "./ui/HeroTyping";

export default function Hero() {
  return (
    <div className="max-w-350 mx-auto h-dvh flex justify-between overflow-visible ">
      <div className="mt-8 pointer-events-none">
        <h1
          className="text-[#bae6fd] text-7xl  
  [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]"
        >
          RYAN <br /> LOCKENBACH
        </h1>
        <HeroTyping />
        {/* <h2 className=" text-3xl mt-4 text-[#64748b] [text-shadow:0_0_10px_#64748b,0_0_40px_#64748b,0_0_60px_#38bdf8]">
          Front End Engineer
        </h2> */}
      </div>
      <div className="absolute left-0 w-dvw  overflow-visible mx-0 -z-10 h-dvh">
        <HeroCanvas />
      </div>
    </div>
  );
}
