import { Club, Spade, Heart, Diamond } from "lucide-react";
import { IconCard } from "../../entities/icon-card/icon-card";

export const styles = [
  {
    color: "#7F2CCB",
    icon: <Club size={64} color="#7F2CCB" />,
    title: "Clubbing and Nightlife",
    description: "Find an outfit for your next night out - or in!",
  },
  {
    color: "#3C91E6",
    icon: <Spade size={64} color="#3C91E6" />,
    title: "Smart Casual",
    description: "Find something comfortable and stylish for everyday wear",
  },
  {
    color: "#FF5964",
    icon: <Heart size={64} color="#FF5964" />,
    title: "Special Occasions",
    description: "Find the perfect outfit for your next special event",
  },
  {
    color: "#3DD6D0",
    icon: <Diamond size={64} color="#3DD6D0" />,
    title: "Luxury and High-End",
    description:
      "Find something truly special for your most important occasions",
  },
];

export const Choice = () => {
  return (
    <div className="flex flex-col gap-8 items-center">
      <p className="text-2xl font-bold text-white">2. Choose your style:</p>
      <div className="flex gap-8">
        {styles.map((style) => {
          return <IconCard {...style} />;
        })}
      </div>
    </div>
  );
};
