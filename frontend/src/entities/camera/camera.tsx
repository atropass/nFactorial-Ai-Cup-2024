import React, { useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { AnimatePresence, motion } from "framer-motion";
import { setImageFile } from "../../features/upload-image/model";
import { useUnit } from "effector-react";
import { addMessageToChat } from "../../features/chat/model";
interface CameraViewProps {
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  onCapture: (imageSrc: string) => void;
}

export const CameraView = ({
  countdown,
  setCountdown,
  onCapture,
}: CameraViewProps) => {
  const addMessage = useUnit(addMessageToChat);
  const webcamRef = useRef(null);
  const setFile = useUnit(setImageFile);
  const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: "user",
  };

  const dataURLtoFile = (dataurl: string, filename: string) => {
    let arr = dataurl.split(","),
      // @ts-ignore
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const capture = () => {
    // @ts-ignore
    const imageSrc = webcamRef.current.getScreenshot();
    const imageFile = dataURLtoFile(imageSrc, "captured_image.jpg");
    setFile(imageFile);
    addMessage({
      author: "ai",
      text: "I see you have uploaded an image. Let me take a look...",
      image: imageFile,
    });
    onCapture(imageSrc);
  };

  useEffect(() => {
    setCountdown(5);

    const interval = setInterval(() => {
      setCountdown((prevCountdown: number) => {
        if (prevCountdown === 1) {
          clearInterval(interval);
          capture();
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [setCountdown]);

  return (
    <div className="w-full h-full relative">
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          position: "absolute",
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <AnimatePresence>
          {countdown > 0 && (
            <motion.div
              key={countdown}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white font-bold text-4xl drop-shadow-xl z-20"
            >
              {countdown}...
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
