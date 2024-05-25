import { Plus } from "lucide-react";
import { useState, DragEvent, useEffect } from "react";
import { Button } from "react-daisyui";
import {
  setImage,
  setImageFile as setFile,
} from "../../features/upload-image/model";
import { useUnit } from "effector-react";
import { addMessageToChat } from "../../features/chat/model";

export const ImageUploader = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [selectImage, selectFile] = useUnit([setImage, setFile]);
  const addMessage = useUnit(addMessageToChat);
  useEffect(() => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        selectImage(base64String);
        console.log("Base64 String:", base64String);
      };
      reader.readAsDataURL(imageFile);
      addMessage({
        author: "ai",
        text: "I see you have uploaded an image. Let me take a look...",
        image: imageFile,
      });
    }
  }, [imageFile]);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];
      if (
        file.size <= 2 * 1024 * 1024 &&
        ["image/png", "image/jpeg", "image/jpg"].includes(file.type)
      ) {
        setImageFile(file);
        selectFile(file);
      } else {
        alert("File size must be less than 2MB and of type png, jpeg, or jpg");
      }
    }
  };

  return (
    <div className="flex w-full h-full flex-col justify-start">
      <div className="flex w-full h-full items-center">
        <div
          className={`w-full h-full bg-slate-700  border border-dashed rounded-md bg-opacity-25 ${
            isDragOver
              ? "border-blue-500 shadow-lg bg-zinc-400"
              : "border-zinc-400"
          } flex items-center justify-center overflow-hidden rounded-xl transition duration-100 ease-in-out`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {selectedImage ? (
            <img
              width={160}
              height={160}
              src={selectedImage}
              alt="Uploaded Image Preview"
              className="h-full w-full object-cover "
            />
          ) : (
            <Plus size={96} color="white" className="opacity-70" />
          )}
        </div>
        <div>
          <div className="mt-4 h-8">
            {imageFile && (
              <Button
                className="btn h-8 min-h-8 bg-red-500 text-white duration-150 hover:bg-red-400"
                onClick={() => {
                  setSelectedImage(null);
                  setImageFile(null);
                }}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
