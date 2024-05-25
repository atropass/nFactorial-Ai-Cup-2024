import { createEvent, createStore, createEffect, sample } from "effector";
import axios from "axios";
import { addMessageToChat } from "../../chat/model";
import { $clothing } from "../../set-clothing/model";
import { $style } from "../../set-style/model";

const $image = createStore<string | null>("");
const $imageFile = createStore<File | null>(null);

const setImage = createEvent<string | null>();
const setImageFile = createEvent<File | null>();

interface Metadata {
  img_url: string;
  url: string;
  price: string;
  pk: number;
}

export interface Product {
  page_content: string;
  metadata: Metadata;
  type: string;
}

const $products = createStore<Product[]>([]);

export const mapped: {
  [key: string]: string;
} = {
  Top: "torso(body)",
  Down: "legs(pants)",
  "I don't know!": "full outfit",
  "Clubbing and Nightlife": "for clubbing/night out/night",
  "Smart Casual": "smart-casual",
  "Special Occasions": "date, romantic, dinner",
  "Luxury and High-End": "luxury and high-end",
};

const uploadImageFx = createEffect<string, any>({
  handler: async () => {
    const rest = await axios
      .post(
        "https://nfactorial-ai-cup-2024-production.up.railway.app/describe-image/",
        {
          image_base64: $image.getState()?.split(",")[1] || "",
        }
      )
      .then((res) => res.data);
    return {
      text: rest.choices[0].message.content,
      author: "ai",
    };
  },
});

//   Top: <ChevronUp size={16} color="white" />,
//   Down: <ChevronDown size={16} color="white" />,
//   "I don't know!": <Frown size={16} color="white" />,
//   "Clubbing and Nightlife": <Club size={16} color="white" />,
//   "Smart Casual": <Spade size={16} color="white" />,
//   "Special Occasions": <Heart size={16} color="white" />,
//   "Luxury and High-End": <Diamond size={16} color="white" />,

const receiveProducts = createEffect<void, Product[]>({
  handler: async () => {
    const products = await axios
      .post(
        `https://nfactorial-ai-cup-2024-production.up.railway.app/analyze-image/`,
        {
          image_base64: $image.getState()?.split(",")[1] || "",
          clothing_area: mapped[$clothing.getState()?.title || ""],
          style: mapped[$style.getState()?.title || ""],
        }
      )
      .then((res) => res.data);
    if (products && products.length > 0) {
      addMessageToChat({
        author: "ai",
        text: "I have found some products for you. Here are some recommendations.",
      });
    }
    return products;
  },
});

sample({
  source: uploadImageFx.doneData,
  target: addMessageToChat,
});

sample({
  source: receiveProducts.doneData,
  target: $products,
});

sample({
  source: $clothing.updates,
  target: receiveProducts,
});

sample({
  source: $style.updates,
  target: receiveProducts,
});

sample({
  clock: $image.updates,
  fn: () => {
    return $image.getState() || "";
  },
  target: uploadImageFx,
});

sample({
  source: setImage,
  target: $image,
});

sample({
  source: setImageFile,
  target: $imageFile,
});

export {
  $image,
  $imageFile,
  uploadImageFx,
  setImage,
  setImageFile,
  $products,
  receiveProducts,
};
