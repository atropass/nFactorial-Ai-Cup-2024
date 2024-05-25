import { Message } from "../../entities/message/message";
import { $chat } from "../../features/chat/model";
import { useUnit } from "effector-react";

export const ChatFrame = (): JSX.Element => {
  const chat = useUnit($chat);
  return (
    <div
      className="w-full h-[40rem] overflow-y-scroll"
      style={{
        boxShadow: "inset 0px -30px 30px 0 rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="flex flex-col w-full py-4">
        {chat.map((message, index) => {
          return <Message key={index} message={message} />;
        })}
      </div>
    </div>
  );
};
