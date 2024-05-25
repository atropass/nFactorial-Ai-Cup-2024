import { Message as MessageInterface } from "../../features/chat/model";
import { motion } from "framer-motion";

export interface MessageProps {
  message: MessageInterface;
}

const messageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Message = ({ message }: MessageProps): JSX.Element => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={messageVariants}
      transition={{ duration: 0.3, delay: 0.1 }}
      className={`px-2 py-1 ${
        message.author === "ai"
          ? "w-full flex flex-col items-start"
          : "w-full flex flex-col items-end"
      }`}
    >
      <div
        className={`rounded-md flex flex-col max-w-2/5 p-4 ${
          message.author === "ai"
            ? "border text-white bg-black bg-opacity-5"
            : `bg-slate-600 text-black`
        }`}
      >
        <p>{message?.text || ""}</p>
      </div>
      {message?.image && (
        <div className="rounded-md">
          <img
            src={URL.createObjectURL(message.image)}
            alt="image"
            className="w-64 h-72 rounded-md mt-2 drop-shadow-md object-cover"
          />
        </div>
      )}
    </motion.div>
  );
};
