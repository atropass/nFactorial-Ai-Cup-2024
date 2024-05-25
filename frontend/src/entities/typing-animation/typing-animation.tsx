import { useState, useEffect } from "react";
import "./style.css";

const words = [
  "a party outfit.",
  "a dress for a prom.",
  "a fit-check.",
  "to look classy.",
  "a casual outfit.",
  "to look formal.",
  "a business attire.",
  "to look elegant.",
  "a fit for a date.",
];

const TypingAnimation = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((index + 1) % words.length);
      return;
    }

    const typingSpeed = 80;
    const erasingSpeed = 30;

    const timeout = setTimeout(
      () => {
        setSubIndex((currentSubIndex) => currentSubIndex + (reverse ? -1 : 1));
      },
      reverse ? erasingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]);

  return (
    <div className="typing-container flex text-white w-full">
      <div className="typing-text lg:text-5xl text-2xl min-w-[30vw] w-full">
        <span className="font-extralight">I need </span>
        <div className="  font-extrabold inline">
          {`${words[index].substring(0, subIndex)}`}
          <span className="font-extralight">|</span>
        </div>
      </div>
    </div>
  );
};

export default TypingAnimation;
