import { Html, Text } from "@react-three/drei";

export default function AboutMe() {
  return (
    <mesh position={[0, -11, 0]} rotation={[-0.3, 0, 0]}>
      <boxGeometry args={[10, 4, 1]} />
      <meshStandardMaterial visible={false} />
      <Html position={[-10.5, -13, 0]}>
        <div className="w-300 rounded-2xl shadow-[inset_0_0_10px_rgba(186,230,253,0.4)]">
          <div className="text-center flex flex-col m-auto rounded-2xl p-8   shadow-[0_0_50px_10px_rgba(186,230,253,0.4)] bg-[rgba(186,230,253,0.05)] backdrop-blur-sm">
            <h1 className="text-[#bae6fd] text-xl md:text-3xl xl:text-3xl 2xl:text-5xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
              Who I am:
            </h1>
            <p className="text-[#bae6fd] text-xs md:text-sm xl:text-lg 2xl:text-xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8] flex flex-col space-y-4 mt-4 ml-4">
              <br />
              I’m a Frontend Engineer with a background in mathematics and
              computer science education. After 5+ years of breaking down
              complex logic for students, I now apply that same architectural
              mindset to building immersive web experiences.
              <br />
              <br />I specialize in the intersection of performance and
              aesthetics—using React, Three.js, and GSAP to turn abstract
              concepts into interactive reality. My transition from educator to
              developer wasn’t just a career change; it was an evolution of my
              passion for logic, problem-solving, and clean design.
            </p>
          </div>
        </div>
      </Html>
    </mesh>
  );
}
