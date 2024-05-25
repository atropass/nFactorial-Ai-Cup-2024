import { createEvent, createStore } from "effector";

export interface Message {
  author: "ai" | "user";
  text: string;
  image?: File | null;
}

const addMessageToChat = createEvent<Message>();
const clearChat = createEvent();

const $chat = createStore<Message[]>([]);

$chat.on(addMessageToChat, (state, message) => [...state, message]);
$chat.on(clearChat, () => []);

export { addMessageToChat, clearChat, $chat };
