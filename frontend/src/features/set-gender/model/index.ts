import { createEvent, createStore, sample } from "effector";

const setGender = createEvent<{ title: string; description: string } | null>();

const $gender = createStore<{ title: string; description: string } | null>(
  null
);

sample({
  source: setGender,
  target: $gender,
});

export { setGender, $gender };
