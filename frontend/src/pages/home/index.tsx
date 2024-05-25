import TypingAnimation from "../../entities/typing-animation/typing-animation";
import "./style.css";
import { Link } from "react-router-dom";
const Home = (): JSX.Element => {
  return (
    <div className="w-screen h-screen bg-slate-50 flex justify-center items-center">
      <video
        autoPlay
        muted
        loop
        className="absolute z-0 object-cover w-full h-full brightness-[0.3]"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="flex flex-col z-10 gap-8 justify-center items-center">
        <div className="w-[30rem] flex flex-col gap-4">
          <TypingAnimation />
          <p className="text-white">
            <span className="font-bold">Attire</span> allows you to find the
            perfect outfit for any occasion. Get a picture of yourself and let
            the AI do the rest.
          </p>
        </div>
        <Link
          to={"/chat"}
          className="rounded-md p-2 px-4 duration-75 hover:shadow-lg text-white bg-slate-50 bg-opacity-0 hover:bg-opacity-5 border"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Home;
