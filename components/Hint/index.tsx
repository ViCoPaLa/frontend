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
    <div className="fixed w-full xl:w-1/2 left-0 xl:bottom-8 xl:top-auto top-3 bottom-auto gap-8 flex flex-col-reverse xl:flex-col xl:items-center items-end text-xl px-4">
      <AnimatePresence>
        {isOpened && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0, transition: { duration: 0.15 } }}
            className="p-8 xl:w-full xl:max-w-lg bg-black/70 origin-top-right xl:origin-bottom rounded-lg"
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
          "flex gap-3 items-center rounded-lg px-2 xl:px-4 py-2 xl:hover:bg-black/20 transition-colors cursor-pointer xl:text-white border border-stroke xl:border-transparent",
          isBounce && "xl:animate-pulse",
        ])}
        onClick={() => {
          setIsOpened((s) => !s);
          setIsBounce(false);
        }}
      >
        <Icons.Lightbulb className="w-6 h-6 xl:w-10 xl:h-10" />
        <div className="xl:block hidden">도움말</div>
      </button>
    </div>
  );
}
