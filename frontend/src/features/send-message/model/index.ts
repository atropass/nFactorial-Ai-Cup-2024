import { createEvent, createEffect, sample } from "effector";
import axios from "axios";
import { addMessageToChat } from "../../chat/model";
import { $chat } from "../../chat/model";
const sendMessage = createEvent<string>();

const sendMessageFx = createEffect<string, any>({
  handler: async (message) => {
    const response = await axios
      .post(
        "https://nfactorial-ai-cup-2024-production.up.railway.app/custom-text-gpt-query/",
        {
          prompt: `Our conversation currently looks like this:
          ${$chat
            .getState()
            .map((message) => `${message.author}: ${message.text}`)
            .join("-")}.
          My next message is: ${message}. RESPOND AS A TEXT. DO NOT ADD ANY SPECIAL CHARACTERS LIKE * or /.
          `,
          max_tokens: 150,
        }
      )
      .then((res) => res.data);
    return { text: response.choices[0].message.content, author: "ai" };
  },
});

sample({
  clock: sendMessageFx.doneData,
  target: addMessageToChat,
});

sample({
  clock: sendMessage,
  target: sendMessageFx,
});

export { sendMessage, sendMessageFx };
