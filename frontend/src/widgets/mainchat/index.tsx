import { useState, useEffect } from "react";
import { pageTransition, pageVariants } from "../../App";
import { motion } from "framer-motion";
import { Chatbox } from "../../entities/chatbox/chatbox";
import { clothing } from "../clothing";
import { $clothing, setclothing } from "../../features/set-clothing/model";
import { useUnit } from "effector-react";
import { $style, setStyle } from "../../features/set-style/model";
import {
  Cat,
  ChevronDown,
  ChevronUp,
  Club,
  Diamond,
  Dog,
  Frown,
  Heart,
  Spade,
} from "lucide-react";
import { Card } from "../../entities/card/card";
import { styles } from "../choice";
import { useNavigate } from "react-router-dom";
import {
  $products,
  setImage,
  setImageFile,
} from "../../features/upload-image/model";
import { ChatFrame } from "../chat-frame";
import { ProductCard } from "../../entities/product-card/product-card";
import { genders } from "../gender";
import { $gender, setGender } from "../../features/set-gender/model";


const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const MainChat = (): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const selectedClothing = useUnit($clothing);
  const selectedStyle = useUnit($style);
  const selectStyle = useUnit(setStyle);
  const selectClothing = useUnit(setclothing);
  const setSelectedImage = useUnit(setImage);
  const setFile = useUnit(setImageFile);
  const selectGender = useUnit(setGender);
  const products = useUnit($products);
  const selectedGender = useUnit($gender);
  const handleReset = () => {
    selectStyle(null);
    selectGender(null);
    selectClothing(null);
    setSelectedImage(null);
    setFile(null);
    navigate("/");
  };
  const icons: {
    [key: string]: JSX.Element;
  } = {
    Top: (
      <ChevronUp
        size={16}
        color="white"
        className="cursor-pointer"
        onClick={() =>
          selectClothing({
            title: "Top",
            description:
              "I want to keep my bottom half - but find something new for the top half.",
          })
        }
      />
    ),
    Down: (
      <ChevronDown
        size={16}
        color="white"
        className="cursor-pointer"
        onClick={() => {
          selectClothing({
            title: "Down",
            description:
              "I want to keep my top half - but find something new for the bottom half.",
          });
        }}
      />
    ),
    "I don't know!": (
      <Frown
        size={16}
        color="white"
        className="cursor-pointer"
        onClick={() => {
          selectClothing({
            title: "I don't know!",
            description: "I am not sure anymore...",
          });
        }}
      />
    ),
    "Clubbing and Nightlife": (
      <Club
        size={16}
        color="white"
        className="cursor-pointer"
        onClick={() => {
          selectStyle({
            title: "Clubbing and Nightlife",
            description: "Find an outfit for your next night out - or in!",
          });
        }}
      />
    ),
    "Smart Casual": (
      <Spade
        size={16}
        color="white"
        className="cursor-pointer"
        onClick={() => {
          selectStyle({
            title: "Smart Casual",
            description:
              "Find something comfortable and stylish for everyday wear",
          });
        }}
      />
    ),
    "Special Occasions": (
      <Heart
        size={16}
        className="cursor-pointer"
        color="white"
        onClick={() => {
          selectStyle({
            title: "Special Occasions",
            description: "Find the perfect outfit for your next special event",
          });
        }}
      />
    ),
    "Luxury and High-End": (
      <Diamond
        size={16}
        color="white"
        className="cursor-pointer"
        onClick={() => {
          selectStyle({
            title: "Luxury and High-End",
            description:
              "Find something truly special for your most important occasions",
          });
        }}
      />
    ),
    Man: <Dog size={16} color="white" />,
    Woman: <Cat size={16} color="white" />,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      className="w-screen h-screen"
      variants={pageVariants}
      transition={pageTransition}
    >
      {loading ? (
        <div className="w-full h-full flex justify-center items-center ">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-white"
          >
            Prepare to chat...
          </motion.div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex w-full h-screen"
        >
          <div className="w-1/3 bg-slate-900 flex items-center bg-opacity-10 z-10">
            {products?.length > 0 && (
              <motion.div
                className="grid grid-cols-2 gap-4 overflow-x-scroll overflow-y-hidden mb-4 px-8 drop-shadow-lg"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {products.map((product) => {
                  return <ProductCard product={product} />;
                })}
              </motion.div>
            )}
          </div>
          <div className="w-2/3 bg-slate-800 bg-opacity-5 border-x border-slate-600 flex flex-col shadow-xl p-4">
            <ChatFrame />
            <Chatbox />
            <div className="absolute left-0 right-0 bottom-0">
              <img src="ornament.svg" className="w-full z-0 opacity-10" />
            </div>
          </div>
          <div className="w-1/3 bg-slate-900 p-8 bg-opacity-10 z-10 flex flex-col">
            <p className="text-lg text-white">Focus on: </p>

            <div className="flex flex-col w-full items-start p-8">
              <div className="flex gap-4">
                {clothing?.map((item) => {
                  return (
                    <Card
                      active={selectedClothing?.title === item.title}
                      icon={icons[item.title]}
                      title={item.title}
                      color={item.color}
                    />
                  );
                })}
              </div>
            </div>
            <p className="text-lg text-white">Style: </p>

            <div className="flex flex-col w-full items-start p-8">
              <div className="flex gap-4">
                {styles?.map((item) => {
                  return (
                    <Card
                      active={selectedStyle?.title === item.title}
                      icon={icons[item.title]}
                      title={item.title}
                      color={item.color}
                    />
                  );
                })}
              </div>
            </div>
            <p className="text-lg text-white">Gender: </p>

            <div className="flex flex-col w-full items-start p-8">
              <div className="flex gap-4">
                {genders?.map((item) => {
                  return (
                    <Card
                      active={selectedGender?.title === item.title}
                      icon={icons[item.title]}
                      title={item.title}
                      color={item.color}
                    />
                  );
                })}
              </div>
            </div>
            <div className="h-screen flex items-end">
              <button
                onClick={handleReset}
                className="mt-8 w-full shadow-md hover:shadow-red-500  border text-white duration-150 rounded-md py-2 px-4 bg-slate-50 bg-opacity-10 hover:bg-red-500"
              >
                Start over
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
