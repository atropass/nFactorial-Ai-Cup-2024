import { Cat, Dog } from "lucide-react";
import { GenderCard } from "../../entities/gender-card/gender-card";

export const genders = [
  {
    color: "#6F58C9",
    icon: <Dog size={64} color="#6F58C9" />,
    title: "Man",
    description: "For the handsome gentlemen",
  },
  {
    color: "#F90093",
    icon: <Cat size={64} color="#F90093" />,
    title: "Woman",
    description: "For the wonderful ladies",
  },
];

export const GenderChoice = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <p className="text-2xl font-bold text-white">1. Choose your gender:</p>
      <div className="flex gap-8">
        {genders.map((style) => {
          return <GenderCard {...style} />;
        })}
      </div>
    </div>
  );
};
