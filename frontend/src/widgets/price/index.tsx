import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6 } from "lucide-react";
import { PriceCard } from "../../entities/price-card/price-card";

export const prices = [
  {
    color: "#BDEDE0",
    icon: <Dice1 size={64} color="#BDEDE0" />,
    startPrice: 0,
    endPrice: 500,
    description: "Nothing too fancy. Something simple and affordable.",
  },
  {
    color: "#BBDBD1",
    icon: <Dice2 size={64} color="#BBDBD1" />,
    startPrice: 500,
    endPrice: 1000,
    description: "Something a bit more special. A little bit of luxury.",
  },
  {
    color: "#B6B8D6",
    icon: <Dice3 size={64} color="#B6B8D6" />,
    startPrice: 1000,
    endPrice: 1500,
    description: "Something truly special. A real treat.",
  },
  {
    color: "#7E78D2",
    icon: <Dice4 size={64} color="#7E78D2" />,
    startPrice: 1500,
    endPrice: 2000,
    description: "Time to splash out. A gift for myself.",
  },
  {
    color: "#731DD8",
    icon: <Dice5 size={64} color="#731DD8" />,
    startPrice: 2000,
    endPrice: 2500,
    description: "A real treasure - unique and beautiful.",
  },
  {
    color: "#401F3E",
    icon: <Dice6 size={64} color="#401F3E" />,
    startPrice: 2500,
    endPrice: 10000,
    description: "The sky is the limit. The most luxurious items.",
  },
];

export const PriceChoice = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <p className="text-2xl font-bold text-white">
        5. Now let's choose how much you want to spend:
      </p>
      <div className="flex gap-8">
        {prices.map((style) => {
          return <PriceCard {...style} />;
        })}
      </div>
    </div>
  );
};
