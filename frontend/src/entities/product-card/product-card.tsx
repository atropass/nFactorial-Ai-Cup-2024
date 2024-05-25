import { Product } from "../../features/upload-image/model";
import { motion } from "framer-motion";
import { getImage } from "../../features/get-image/model";

interface ProductCardProps {
  product: Product;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ProductCard = ({ product }: ProductCardProps): JSX.Element => {
  //   const handleTryClick = () => {
  //     getImage(product.page_content);
  //   };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      variants={cardVariants}
      className="text-xl font-bold text-white flex flex-col justify-center gap-2"
    >
      <a
        href={product.metadata.url}
        className="bg-slate-800 drop-shadow-lg hover:bg-slate-700 duration-150 bg-opacity-30 w-28 h-28 flex flex-col items-center border p-1 rounded-md cursor-pointer"
      >
        <img
          src={product.metadata.img_url}
          alt="product"
          className="w-12 h-12 rounded-md mt-2 drop-shadow-md object-cover"
        />
        <p className="mt-2 font-bold text-white text-sm">
          {product.page_content.split(" ")[0]}
        </p>
        <p className="italic font-extralight text-xs">
          {product.metadata.price}$
        </p>
      </a>
      {/* <button
        onClick={handleTryClick}
        className="text-xs p-2 flex border rounded-md gap-2 items-center justify-center hover:border-pink-500 hover:text-pink-500 duration-75"
      >
        <p>Try</p>
        <Sparkles size={12} />
      </button> */}
    </motion.div>
  );
};
