import { ChevronDown, ChevronUp, Frown } from "lucide-react";
import { ClothingCard } from "../../entities/clothing-card/clothing-card";
import { motion } from "framer-motion";
import { pageTransition, pageVariants } from "../../App";
export const clothing = [
  {
    color: "#0E34A0",
    icon: <ChevronUp size={72} color="#0E34A0" />,
    title: "Top",
    description:
      "I want to keep my bottom half - but find something new for the top half.",
  },
  {
    color: "#CF1259",
    icon: <ChevronDown size={72} color="#CF1259" />,
    title: "Down",
    description:
      "I want to keep my top half - but find something new for the bottom half.",
  },
  {
    color: "#F26419",
    icon: <Frown size={72} color="#F26419" />,
    title: "I don't know!",
    description: "I am not sure anymore...",
  },
];

export const ClothingChoice = () => {
  return (
    <motion.div
      variants={pageVariants}
      animate={"in"}
      transition={{ duration: 0.3, delay: 0.5 }}
      className="flex flex-col gap-8 items-center"
    >
      <p className="text-2xl font-bold text-white">4. What should stay?</p>
      <div className="flex gap-8">
        {clothing.map((style) => {
          return <ClothingCard {...style} />;
        })}
      </div>
    </motion.div>
  );
};
