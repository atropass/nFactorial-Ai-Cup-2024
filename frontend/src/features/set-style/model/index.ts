import { createEvent, createStore, sample } from "effector";

const $style = createStore<{ title: string; description: string } | null>(null);

const setStyle = createEvent<{ title: string; description: string } | null>();

sample({
  source: setStyle,
  target: $style,
});

export { $style, setStyle };
