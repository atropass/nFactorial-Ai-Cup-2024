import { useState, useCallback } from "react";
import { CameraView } from "./camera";
import { Camera } from "lucide-react";
import { setImage } from "../../features/upload-image/model";
import { useUnit } from "effector-react";
import { ImageUploader } from "../image-uploader/image-uploader";
export const CaptureButton = () => {
  const upload = useUnit(setImage);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [type, setType] = useState<"Camera" | "Uploader">("Camera");
  const [countdown, setCountdown] = useState(5);
  const handleCapture = useCallback((image: string) => {
    upload(image);
    setCameraOpen(false);
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      <h1 className="text-2xl text-white font-bold text-center">
        3. Capture an image
      </h1>
      {type === "Camera" ? (
        <div
          onClick={() => setCameraOpen(!cameraOpen)}
          className="relative w-full h-[30rem]
      cursor-pointer bg-slate-700 bg-opacity-25 rounded-md shadow-xl border border-dashed hover:bg-opacity-10 flex items-center justify-center"
        >
          {!cameraOpen && (
            <div>
              <Camera size={96} color="white" className="opacity-70" />
            </div>
          )}
          {cameraOpen && (
            <CameraView
              countdown={countdown}
              setCountdown={setCountdown}
              onCapture={handleCapture}
            />
          )}
        </div>
      ) : (
        <div className="w-full h-96">
          <ImageUploader />
        </div>
      )}

      <button
        onClick={() => setType(type === "Camera" ? "Uploader" : "Camera")}
        className="w-full bg-slate-700 bg-opacity-25 border text-white font-bold p-4 rounded-md shadow-xl hover:bg-opacity-10"
      >
        {type === "Camera" ? "Or upload an image..." : "Or use the camera..."}
      </button>
    </div>
  );
};
