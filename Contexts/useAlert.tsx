import { ReactNode, createContext, useState, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

const AlertContext = createContext({
  message: "",
  push: (text: string) => {},
});

export default function AlertProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState("");
  const push = (text: string) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };
  return (
    <AlertContext.Provider value={{ message, push }}>
      <AnimatePresence>
        {message && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-[50] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            <div className="px-4 py-2 rounded-lg text-lg bg-white font-[chosun] shadow-lg">
              {message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </AlertContext.Provider>
  );
}

export const useAlert = () => useContext(AlertContext);
