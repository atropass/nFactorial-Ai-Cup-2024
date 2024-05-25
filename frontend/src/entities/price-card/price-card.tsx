import { useState } from "react";
import { motion } from "framer-motion";
import { useUnit } from "effector-react";
import { setPriceRange } from "../../features/set-price/model";

interface PriceCardProps {
  icon: React.ReactNode;
  startPrice: number;
  endPrice: number;
  description: string;
  color: string;
}

export const PriceCard = ({
  icon,
  startPrice,
  endPrice,
  description,
  color,
}: PriceCardProps): JSX.Element => {
  const selectPrice = useUnit(setPriceRange);
  const [open, setOpen] = useState(false);
  const shadow = `0 0 20px 0 ${color}, 0 0 40px 0 ${color}33, 0 0 20px rgba(0, 0, 0, 0.5)`;

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleClick = () => {
    selectPrice({
      startPrice,
      endPrice,
    });
  };

  return (
    <motion.div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        width: open ? "300px" : "150px",
        height: "150px",
        boxShadow: open ? shadow : "none",
      }}
      className={`p-4 bg-slate-50 bg-opacity-0 hover:bg-opacity-5 duration-75 border cursor-pointer rounded-md flex items-center justify-center iconcard`}
    >
      {!open && icon}
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-64"
        >
          <h3 className="text-lg font-bold" style={{ color: color }}>
            {startPrice}$ - {endPrice}$
          </h3>
          <p>{description}</p>
        </motion.div>
      )}
    </motion.div>
  );
};
