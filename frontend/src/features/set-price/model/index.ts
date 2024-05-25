import { createEvent, createStore, sample } from "effector";

const setPriceRange = createEvent<{
  startPrice: number;
  endPrice: number;
} | null>();

const $priceRange = createStore<{
  startPrice: number;
  endPrice: number;
} | null>(null);

sample({
  source: setPriceRange,
  target: $priceRange,
});

export { setPriceRange, $priceRange };
