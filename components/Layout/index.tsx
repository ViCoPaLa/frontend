import {
  ReactNode,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import cc from "classcat";
import { AnimatePresence, motion } from "framer-motion";
import { splitText } from "@/utils/splitText";
import { useScreenSize } from "@/Contexts/useScreenSize";
import AlertProvider from "@/Contexts/useAlert";

export default function Layout({
  header = false,
  darker = false,
  background,
  text,
  setIsEndedBackground,
  children,
}: {
  header?: boolean;
  darker?: boolean;
  background?: string;
  text: string;
  setIsEndedBackground: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}) {
  const [isBackgroundOpened, setIsBackgroundOpened] = useState(true);
  const { width } = useScreenSize();

  useEffect(() => {
    if (width >= 1280) {
      setIsEndedBackground(true);
    }
  }, [width]);

  useEffect(() => {
    setIsBackgroundOpened(true);
  }, [background]);

  useEffect(() => {
    if (isBackgroundOpened) setIsEndedBackground(false);
    else setIsEndedBackground(true);
  }, [isBackgroundOpened, setIsEndedBackground]);

  return (
    <div
      className="w-full h-screen bg-primary flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` || "none" }}
    >
      {header && (
        <header className="fixed left-0 top-0 xl:px-10 xl:py-8 pt-8 z-[30] w-full xl:w-auto flex items-center justify-center">
          {darker ? (
            <img src="/header-logo-darker.png" className="xl:w-72 w-36" />
          ) : (
            <img src="/header-logo.png" className="xl:w-72 w-32" />
          )}
        </header>
      )}
      <div className="w-full h-screen fixed inset-0 z-10 mix-blend-multiply opacity-70">
        <img src="/noise.jpg" className="w-full h-full object-cover" />
      </div>
      <div className="relative w-full hidden xl:flex items-center justify-center pl-36 pr-24">
        <img
          src="/logo.png"
          className={cc(["w-full", background && "opacity-0"])}
        />
        <AnimatePresence>
          {text && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute z-[30] inset-0 flex flex-col text-3xl items-center justify-center text-white font-[chosun]"
            >
              {splitText(text)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full max-w-[800px] flex justify-center shrink-0 z-[20]">
        <img
          src="/border-l.png"
          className="hidden lg:block h-screen object-contain translate-x-1/3"
        />
        <div
          className={cc([
            "relative w-full max-w-md h-screen overflow-auto bg-background z-[25] xl:pt-0",
            header && "pt-16",
          ])}
        >
          <AlertProvider>
            <AnimatePresence>
              {isBackgroundOpened && background && (
                <>
                  <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0, transition: { duration: 2 } }}
                    className="xl:hidden w-full h-full absolute z-[41] bg-black"
                    onClick={() => setIsBackgroundOpened(false)}
                  ></motion.div>
                  <motion.div
                    exit={{ opacity: 0, transition: { duration: 1 } }}
                    className="xl:hidden w-full h-full absolute z-[40] bg-cover bg-center"
                    style={{ backgroundImage: `url(${background})` || "none" }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { delay: 2, duration: 1 },
                      }}
                      className="w-full h-full flex flex-col text-2xl items-center text-center justify-center p-8 text-white font-[chosun]"
                    >
                      {splitText(text)}
                    </motion.div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
            {children}
          </AlertProvider>
        </div>
        <img
          src="/border-r.png"
          className="hidden lg:block h-screen object-contain -translate-x-1/3"
        />
      </div>
    </div>
  );
}
