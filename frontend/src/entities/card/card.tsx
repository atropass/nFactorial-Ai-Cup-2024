import { useState } from "react";

export const Card = ({
  active,
  icon,
  title,
  color,
}: {
  active: boolean;
  icon: JSX.Element;
  title: string;
  color: string;
}) => {
  const [hovered, setHovered] = useState(false);
  const mouthEnter = () => {
    setHovered(true);
  };
  const mouthLeave = () => {
    setHovered(false);
  };
  return (
    <div>
      <div
        onMouseEnter={mouthEnter}
        onMouseLeave={mouthLeave}
        className={`rounded-md p-2 border shadow-lg`}
        style={{
          backgroundColor: active ? color : "transparent",
          color: active ? "white" : "black",
          boxShadow: active ? `0 0 20px 0 ${color}` : "none",
        }}
      >
        {icon}
      </div>
      {hovered && <h3 className="absolute text-xs p-1">{title}</h3>}
    </div>
  );
};
