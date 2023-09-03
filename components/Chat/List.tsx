import { ChatType } from "@/types/chat";
import ChatBubble from "./Bubble";

export default function ChatList({ chats }: { chats: ChatType[] }) {
  return (
    <div className="">
      {chats.map((chat, i) => (
        <ChatBubble
          key={i}
          texts={chat.message}
          image={chat.image}
          person={chat.person}
          isUser={false}
        />
      ))}
    </div>
  );
}
