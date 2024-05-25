import { CaptureButton } from "../../entities/camera/button";
import { Choice } from "../../widgets/choice";
import { $style } from "../../features/set-style/model";
import { useUnit } from "effector-react";
import { motion } from "framer-motion";
import { pageTransition, pageVariants } from "../../App";
import { $image } from "../../features/upload-image/model";
import { MainChat } from "../../widgets/mainchat";
import { ClothingChoice } from "../../widgets/clothing";
import { $clothing } from "../../features/set-clothing/model";
import { $gender } from "../../features/set-gender/model";
import { GenderChoice } from "../../widgets/gender";

const Chat = (): JSX.Element => {
  const content = () => {
    if (!gender) {
      return <GenderChoice />;
    } else if (!style) {
      return <Choice />;
    } else if (!image) {
      return (
        <div className="w-96 p-4 ">
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            className="w-full flex flex-col gap-4"
            variants={pageVariants}
            transition={pageTransition}
          >
            <CaptureButton />
          </motion.div>
        </div>
      );
    } else if (!clothing) {
      return (
        <div className="w-96 p-4">
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            className="w-full flex flex-col gap-4"
            variants={pageVariants}
            transition={pageTransition}
          >
            <ClothingChoice />
          </motion.div>
        </div>
      );
    } else {
      return <MainChat />;
    }
  };
  const style = useUnit($style);
  const image = useUnit($image);
  const clothing = useUnit($clothing);
  const gender = useUnit($gender);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      {content()}
    </div>
  );
};

export default Chat;
