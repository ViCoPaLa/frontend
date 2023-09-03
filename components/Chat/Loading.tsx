import cc from "classcat";
import { motion } from "framer-motion";
import BubbleTriangle from "./BubbleTriangle.svg";

export default function ChatLoading() {
  return (
    <div
      className={cc([
        "w-full flex mb-6 px-4 xl:pr-0 xl:pl-2 flex-row justify-center gap-6",
      ])}
    >
      <div className="w-2 h-2 bg-green-mute rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-green-mute rounded-full animate-pulse"></div>
      <div className="w-2 h-2 bg-green-mute rounded-full animate-pulse"></div>
    </div>
  );
}
