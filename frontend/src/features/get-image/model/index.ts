import axios from "axios";
import { createEvent, createEffect, sample } from "effector";
import { $imageFile } from "../../upload-image/model";

const getImage = createEvent<string>();
const getImageFx = createEffect(async (prompt: string) => {
  try {
    const requestBody = {
      prompt: prompt,
      n: 4,
      size: "512x512",
      image: $imageFile.getState(),
      model: "dall-e-2",
    };
    const response = await axios
      .post("https://api.openai.com/v1/images/edits", requestBody, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer`,
        },
      })
      .then((res) => res.data);
    return response;
  } catch (error) {
    console.error(error);
  }
});

sample({
  clock: getImage,
  target: getImageFx,
});

export { getImage, getImageFx };
