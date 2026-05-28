import Image from "next/image";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaExternalLinkAlt } from "react-icons/fa";

interface ProjectProps {
  project: any;
  width: number;
  height: number;
  open: boolean;
  setOpen: any;
}
export default function ProjectDescription({
  project,
  width,
  height,
  open,
  setOpen,
}: ProjectProps) {
  return (
    <div
      className="absolute m-auto rounded-2xl shadow-[0_0_50px_10px_rgba(186,230,253,0.4)] bg-[rgba(2,38,58,0.3)] transition-all ease-in backdrop-blur-lg duration-200"
      style={{
        width: `${width + 10}px`,
        height: `${height + 10}px`,
        opacity: `${open ? 1 : 0}`,
        pointerEvents: open ? "auto" : "none",
      }}
    >
      {open ? (
        <div className="shadow-[inset_0_0_10px_rgba(186,230,253,0.4)] py-8 px-10 w-full h-full rounded-2xl">
          <h1 className="flex justify-between items-center text-[#bae6fd] text-xl md:text-3xl xl:text-3xl 2xl:text-5xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
            {project.title}
            <span
              className="text-xl hover:text-white hover:[text-shadow:0_0_10px_#ffffff,0_0_20px_#bae6fd,0_0_40px_#bae6fd,0_0_70px_#38bdf8,0_0_100px_#0284c7] cursor-pointer "
              onClick={() => setOpen(false)}
            >
              X
            </span>
          </h1>
          <Image
            src={`${project.image}`}
            width={`${Math.round(width / 2)}`}
            height={`${Math.round(height / 2)}`}
            alt="day"
            className="mx-auto mt-6 rounded-lg shadow-[0_0_50px_10px_rgba(186,230,253,0.4)]"
          />
          <p className="text-center mt-4 text-[#bae6fd] text-sm md:text-md xl:text-lg 2xl:text-xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
            {project.description}
          </p>
          <br />
          <span className="text-center text-[#bae6fd] text-xs md:text-sm xl:text-md 2xl:text-lg [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
            Built with {project.tools}.
          </span>
          <div className="absolute bottom-8 left-0 w-full flex justify-evenly">
            <a
              className=" text-[#bae6fd] text-lg md:text-xl xl:text-2xl 2xl:text-3xl hover:scale-110 hover:text-gray-100  drop-shadow-[0_0_10px_#bae6fd,0_0_20px_#bae6fd] hover:drop-shadow-[0_0_10px_#ffffff,0_0_20px_#bae6fd,0_0_40px_#38bdf8]"
              href={project.gitLink}
              target="_blank"
            >
              <FaGithub />
            </a>
            <a
              className=" text-[#bae6fd] text-lg md:text-xl xl:text-2xl 2xl:text-3xl hover:scale-110 hover:text-gray-100 drop-shadow-[0_0_10px_#bae6fd,0_0_20px_#bae6fd] hover:drop-shadow-[0_0_10px_#ffffff,0_0_20px_#bae6fd,0_0_40px_#38bdf8]"
              href={project.liveLink}
              target="_blank"
            >
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
