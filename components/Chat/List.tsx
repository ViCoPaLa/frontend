import { ChatType } from "@/types/chat";
import ChatBubble from "./Bubble";
import ChatLoading from "./Loading";

export default function ChatList({
  chats,
  isLoading,
}: {
  chats: ChatType[];
  isLoading: boolean;
}) {
  return (
    <div className="">
      {chats.map((chat, i) => (
        <ChatBubble
          key={i}
          texts={chat.message}
          image={chat.image}
          person={chat.person}
          isUser={chat.isUser}
        />
      ))}
      {isLoading && <ChatLoading />}
    </div>
  );
}
