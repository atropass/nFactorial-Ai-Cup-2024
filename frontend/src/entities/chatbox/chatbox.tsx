import { Send } from "lucide-react";

import { sendMessage } from "../../features/send-message/model";
import { useUnit } from "effector-react";
import { useState } from "react";
import { addMessageToChat } from "../../features/chat/model";

export const Chatbox = (): JSX.Element => {
  const [text, setText] = useState<string>("");
  const addMessage = useUnit(addMessageToChat);
  const send = useUnit(sendMessage);
  const handleSubmit = () => {
    send(text);
    addMessage({
      author: "user",
      text: text,
    });
    setText("");
  };

  return (
    <div className="flex gap-4 w-full py-2 z-10">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
        className="w-full  rounded-md shadow-xl p-4 border bg-slate-800 bg-opacity-10 border-white"
        placeholder="Ask Attire about your fit..."
      ></textarea>
      <Send
        size={24}
        color="white"
        onClick={handleSubmit}
        className="cursor-pointer mt-4 hover:brightness-75 duration-75"
      />
    </div>
  );
};
