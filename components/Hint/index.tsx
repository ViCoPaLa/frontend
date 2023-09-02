import cc from "classcat";
import Icons from "../Icons";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLayout } from "@/Contexts/useLayoutContext";

export default function Hint({ text }: { text: string }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isBounce, setIsBounce] = useState(true);
  const { setHideText } = useLayout();

  useEffect(() => {
    if (isOpened) setHideText(true);
    else setHideText(false);
  }, [isOpened]);

  return (
    <div className="fixed w-full xl:w-1/2 left-0 bottom-20 xl:bottom-0 gap-8 flex flex-col items-center text-xl py-8">
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, transition: { duration: 0.15 } }}
            className="p-8 bg-black/70 origin-bottom rounded-lg"
          >
            <div
              className="text-sm text-white font-medium leading-6 text-center [&>h1]:text-lg [&>strong]:text-base"
              dangerouslySetInnerHTML={{
                __html: text.split("\n").join("<br/>"),
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <button
        className={cc([
          "flex gap-3 items-center rounded-lg px-4 py-2 xl:hover:bg-black/20 transition-colors cursor-pointer xl:text-white bg-white xl:bg-transparent",
          isBounce && "animate-pulse",
        ])}
        onClick={() => {
          setIsOpened((s) => !s);
          setIsBounce(false);
        }}
      >
        <Icons.Lightbulb className="w-6 h-6 xl:w-10 xl:h-10" />
        도움말
      </button>
    </div>
  );
}
