import cc from "classcat";
import BubbleTriangle from "./BubbleTriangle.svg";

export default function ChatBubble({
  isUser,
  texts,
}: {
  isUser: boolean;
  texts: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      {texts.map((text, i) => (
        <div
          key={i}
          className={cc([
            "w-full flex px-2 justify-start group items-start",
            isUser ? "flex-row-reverse" : "flex-row",
          ])}
        >
          <BubbleTriangle
            className={cc([
              "w-4 opacity-0 group-first-of-type:opacity-100",
              isUser ? "fill-gray-chat -scale-x-100" : "fill-green-mute",
            ])}
          />
          <div
            className={cc([
              "px-4 py-2 max-w-xs rounded-lg",
              isUser
                ? "bg-gray-chat text-black group-first-of-type:rounded-tr-none"
                : "bg-green-mute text-white group-first-of-type:rounded-tl-none",
            ])}
          >
            {text}
          </div>
        </div>
      ))}
    </div>
  );
}
