import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import Icons from "../Icons";
import { useLayout } from "@/Contexts/useLayoutContext";
import cc from "classcat";
import { getNumberToString } from "@/utils/getNumberToString";

export default function MissionModal({
  isOpened,
  setIsOpened,
  index,
  text,
}: {
  isOpened: boolean;
  setIsOpened: Dispatch<SetStateAction<boolean>>;
  index: number;
  text: string;
}) {
  const [disableClose, setDisableClose] = useState(true);
  const { isEndedBackground } = useLayout();
  return (
    isEndedBackground && (
      <div
        className={cc([
          "absolute inset-0 w-full h-screen flex items-center justify-center",
          !isOpened && "pointer-events-none",
        ])}
      >
        <AnimatePresence>
          {isOpened && (
            <motion.div
              className="flex w-full h-full items-center justify-center p-4"
              onClick={() => {
                if (!disableClose) setIsOpened(false);
              }}
              initial={{ y: 0, opacity: 1 }}
              exit={{
                y: -200,
                opacity: 0,
                transition: { duration: 0.5 },
              }}
            >
              <motion.img
                initial={{ scaleX: 0 }}
                animate={{
                  scaleX: 1,
                  transition: { type: "spring", duration: 0.5, delay: 1 },
                }}
                src="/mission.png"
                className="w-full"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1.6, duration: 0.5 },
                }}
                onAnimationComplete={() => setDisableClose(false)}
                className="absolute font-[chosun] text-center flex flex-col items-center gap-1"
              >
                <div className="text-sm font-semibold">
                  {getNumberToString(index)} 번째 임무
                </div>
                <div className="text-lg font-bold px-16 break-keep">{text}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  );
}
