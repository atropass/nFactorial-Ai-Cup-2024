import { createEvent, createStore, sample } from "effector";

const $clothing = createStore<{ title: string; description: string } | null>(
  null
);

const setclothing = createEvent<{
  title: string;
  description: string;
} | null>();

sample({
  source: setclothing,
  target: $clothing,
});

export { $clothing, setclothing };
