import React from "react";
import HeroCanvas from "./hero_ui/HeroCanvas";
import HeroTyping from "./hero_ui/HeroTyping";

export default function Hero() {
  return (
    <div className="">
      <div className="absolute left-0 w-dvw  overflow-visible mx-0 -z-10 h-dvh">
        <HeroCanvas />
      </div>
    </div>
  );
}
