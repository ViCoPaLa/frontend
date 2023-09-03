import cc from "classcat";
import { motion } from "framer-motion";
import BubbleTriangle from "./BubbleTriangle.svg";

export default function ChatBubble({
  isUser,
  person,
  image,
  texts,
}: {
  isUser: boolean;
  person: string;
  image: string;
  texts: string[];
}) {
  return (
    <div
      className={cc([
        "w-full flex mb-6 px-4 xl:pr-0 xl:pl-2",
        isUser ? "flex-row-reverse" : "flex-row",
      ])}
    >
      {!isUser && (
        <div className="rounded-full overflow-clip w-12 h-12 bg-white">
          <img src={image} className="w-full h-full object-cover" />
        </div>
      )}
      <div>
        {!isUser && <div className="ml-6 text-sm mb-2">{person}</div>}
        <div className="flex flex-col gap-2">
          {texts.map((text, i) => (
            <motion.div
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: { duration: 0.2, delay: i * 0.5 },
              }}
              key={i}
              className={cc([
                "w-full flex px-3 justify-start group items-start",
                isUser
                  ? "flex-row-reverse origin-top-right"
                  : "flex-row origin-top-left",
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
                  "px-3 py-2 rounded-xl w-fit max-w-[256px]",
                  isUser
                    ? "bg-gray-chat text-black group-first-of-type:rounded-tr-none"
                    : "bg-green-mute text-white group-first-of-type:rounded-tl-none",
                ])}
              >
                {text}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
