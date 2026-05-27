import React from "react";
import { useForm, ValidationError } from "@formspree/react";

interface ContactFormProps {
  setContactOpen: (mounted: boolean) => void;
}
export default function ContactForm({ setContactOpen }: ContactFormProps) {
  const [state, handleSubmit, reset] = useForm("xdajyoly");
  if (state.succeeded) {
    return (
      <div className="md:m-auto h-fit w-fit rounded-2xl shadow-[inset_0_0_10px_rgba(186,230,253,0.4)]">
        <div className="text-center flex flex-col m-auto rounded-2xl p-8 shadow-[0_0_50px_10px_rgba(186,230,253,0.4)] bg-[rgba(186,230,253,0.05)] backdrop-blur-sm">
          <p className="text-[#bae6fd] [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
            Thank you for reaching out!
            <br /> I'll get back to you soon!
          </p>
          <button
            className="mt-4 self-center text-slate-950 py-2 px-4 rounded-xl border-2 border-[#bae6fd] bg-[#bae6fd] shadow-[0_0_50px_10px_rgba(186,230,253,0.4)] hover:bg-transparent hover:backdrop-blur-sm hover:text-[#bae6fd] hover:[text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8] transition cursor-pointer"
            onClick={() => {
              reset;
              setContactOpen(false);
            }}
          >
            Ok
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="md:m-auto h-fit md:w-1/2 rounded-2xl shadow-[inset_0_0_10px_rgba(186,230,253,0.4)]">
      <div className="text-center flex flex-col m-auto rounded-2xl p-8 shadow-[0_0_50px_10px_rgba(186,230,253,0.4)] bg-[rgba(186,230,253,0.05)] backdrop-blur-sm">
        <h1 className="flex justify-between items-center text-[#bae6fd] text-lg md:text-xl xl:text-2xl 2xl:text-3xl [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]">
          Interested in working with me?
          <span
            className="text-xl hover:text-white hover:[text-shadow:0_0_10px_#ffffff,0_0_20px_#bae6fd,0_0_40px_#bae6fd,0_0_70px_#38bdf8,0_0_100px_#0284c7] cursor-pointer "
            onClick={() => setContactOpen(false)}
          >
            X
          </span>
        </h1>
        <form
          onSubmit={handleSubmit}
          className="mx-auto my-8 w-2/3 flex flex-col items-start text-[#bae6fd] [text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8]"
        >
          <label
            htmlFor="name"
            className="text-md md:text-lg lg:text-xl xl:text-2xl"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className="my-4 w-full h-10 p-2 outline-none rounded-xl border-2 border-[#bae6fd] shadow-[0_0_50px_10px_rgba(186,230,253,0.4)]"
          />
          <label
            htmlFor="email"
            className="text-md md:text-lg lg:text-xl xl:text-2xl"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="my-4 w-full h-10 p-2 outline-none rounded-xl border-2 border-[#bae6fd] shadow-[0_0_50px_10px_rgba(186,230,253,0.4)]"
          />
          <label
            htmlFor="message"
            className="text-md md:text-lg lg:text-xl xl:text-2xl"
          >
            Message
          </label>
          <ValidationError prefix="Email" field="email" errors={state.errors} />
          <textarea
            id="message"
            name="message"
            className="my-4 w-full h-40 p-2 outline-none rounded-xl border-2 border-[#bae6fd] shadow-[0_0_50px_10px_rgba(186,230,253,0.4)]"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
          />
          <button
            type="submit"
            disabled={state.submitting}
            className="text-md md:text-lg lg:text-xl xl:text-2xl self-center text-slate-950 py-4 px-6 rounded-xl border-2 border-[#bae6fd] bg-[#bae6fd] shadow-[0_0_50px_10px_rgba(186,230,253,0.4)] hover:bg-transparent hover:text-[#bae6fd] hover:[text-shadow:0_0_10px_#bae6fd,0_0_40px_#bae6fd,0_0_60px_#38bdf8] transition cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
